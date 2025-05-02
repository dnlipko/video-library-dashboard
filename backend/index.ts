// app.js (backend entry point)
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { requestLogger, errorLogger } from './src/utils/logger';
import videoRoutes from './src/routes/videos';
import tagRoutes from './src/routes/tags';

const app = express();

app.use(express.json());        // parse JSON request bodies
app.use(cors());               // enable CORS for all origins by default (configurable)
app.use(requestLogger);

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/videos', videoRoutes);
app.use('/api/tags', tagRoutes);

app.use(errorLogger);
app.use((_err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
