import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('Mudrassa Auth API'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Auth server running on ${PORT}`));
