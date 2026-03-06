import express from 'express';
import cors from 'cors';
import resumeRoutes from './routes/resumeRoutes';

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
}));

app.use(express.json({ limit: '1mb' }));

app.use('/api', resumeRoutes);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
