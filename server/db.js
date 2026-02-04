import fs from 'fs/promises';

const DB_PATH = './data.json';

async function readDb(){
  try{
    const raw = await fs.readFile(DB_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (err){
    return { users: [], password_resets: [] };
  }
}

async function writeDb(data){
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
}

export async function findUserByEmail(email){
  const db = await readDb();
  return db.users.find(u => u.email === email);
}

export async function createUser({ email, name, password, role }){
  const db = await readDb();
  const id = `u${Date.now()}${Math.random().toString(36).slice(2,6)}`;
  const user = { id, email, name: name || '', password: password || null, role: role || 'user', created_at: new Date().toISOString() };
  db.users.push(user);
  await writeDb(db);
  return user;
}

export async function findUserById(id){
  const db = await readDb();
  return db.users.find(u => u.id === id);
}

export async function updateUserPassword(userId, hashed){
  const db = await readDb();
  const u = db.users.find(x => x.id === userId);
  if(!u) return false;
  u.password = hashed;
  await writeDb(db);
  return true;
}

export async function insertPasswordReset(userId, token, expires){
  const db = await readDb();
  const id = `r${Date.now()}${Math.random().toString(36).slice(2,6)}`;
  const rec = { id, user_id: userId, token, expires_at: expires };
  db.password_resets.push(rec);
  await writeDb(db);
  return rec;
}

export async function findPasswordResetByToken(token){
  const db = await readDb();
  return db.password_resets.find(r => r.token === token);
}

export async function deletePasswordResetById(id){
  const db = await readDb();
  const next = db.password_resets.filter(r => r.id !== id);
  db.password_resets = next;
  await writeDb(db);
}

export default { findUserByEmail, createUser, findUserById, updateUserPassword, insertPasswordReset, findPasswordResetByToken, deletePasswordResetById }
