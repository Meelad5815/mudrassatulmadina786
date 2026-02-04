# Mudrassa Auth Server (Express)

This server provides basic authentication endpoints for the Mudrassa frontend:
- /api/auth/register  (POST) - { email, password, name }
- /api/auth/login     (POST) - { email, password }
- /api/auth/google    (POST) - { idToken }
- /api/auth/request-password-reset (POST) - { email } -> sends email via Ethereal (dev) or configured SMTP
- /api/auth/reset-password (POST) - { token, password }

Getting started:
1. cd server
2. npm install
3. Copy `.env.example` to `.env` and set `JWT_SECRET` (and `GOOGLE_CLIENT_ID` if using Google sign-in)
4. npm run dev

Notes:
- Uses SQLite (data stored in `server/data.db`)
- If no SMTP settings are provided, the server will create an Ethereal account for dev/testing and return a preview URL for the sent email
