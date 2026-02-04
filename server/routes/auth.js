import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db.js';
import { OAuth2Client } from 'google-auth-library';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

function signToken(user) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '7d' });
}

async function getTransport() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });
  }
  // Create ethereal test account if no SMTP configured
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: { user: testAccount.user, pass: testAccount.pass }
  });
}

// Register
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });

  const existing = await db.findUserByEmail(email);
  if (existing) return res.status(400).json({ error: 'User already exists' });

  const hashed = await bcrypt.hash(password, 10);
  const user = await db.createUser({ email, name: name || '', password: hashed });

  res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role }, token: signToken(user) });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });

  const user = await db.findUserByEmail(email);
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.password || '');
  if (!ok) return res.status(400).json({ error: 'Invalid credentials' });

  res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role }, token: signToken(user) });
});

// Google token sign-in
router.post('/google', async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) return res.status(400).json({ error: 'idToken required' });

  let payload;
  try {
    const ticket = await client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID });
    payload = ticket.getPayload();
  } catch (err) {
    return res.status(400).json({ error: 'Invalid Google id token' });
  }

  const email = payload.email;
  let user = await db.findUserByEmail(email);
  if (!user) {
    user = await db.createUser({ email, name: payload.name || '' });
  }

  res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role }, token: signToken(user) });
});

// Request password reset
router.post('/request-password-reset', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'email required' });

  const user = await db.findUserByEmail(email);
  if (!user) return res.json({ ok: true }); // Don't reveal user existence

  const token = crypto.randomBytes(32).toString('hex');
  const expires = Date.now() + (60 * 60 * 1000); // 1 hour
  const rec = await db.insertPasswordReset(user.id, token, expires);

  const transport = await getTransport();
  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${token}`;
  const info = await transport.sendMail({
    from: 'no-reply@mudrassa.local',
    to: user.email,
    subject: 'Password reset',
    text: `Click to reset password: ${resetUrl}`,
    html: `<p>Click to reset password: <a href="${resetUrl}">${resetUrl}</a></p>`
  });

  const preview = nodemailer.getTestMessageUrl(info);
  res.json({ ok: true, preview });
});

// Reset password
router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password) return res.status(400).json({ error: 'token and password required' });

  const row = await db.findPasswordResetByToken(token);
  if (!row || row.expires_at < Date.now()) return res.status(400).json({ error: 'Invalid or expired token' });

  const hashed = await bcrypt.hash(password, 10);
  await db.updateUserPassword(row.user_id, hashed);
  await db.deletePasswordResetById(row.id);

  res.json({ ok: true });
});

export default router;
