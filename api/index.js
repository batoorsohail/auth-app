import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/user.js';
import authRouter from './routes/auth.js';

dotenv.config();

mongoose.connect(process.env.MONGO)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.log(err);
});

const app = express();
app.use(cors());

app.use(express.json());

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});