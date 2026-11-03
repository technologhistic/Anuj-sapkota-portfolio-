import 'dotenv/config';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import contactHandler from './api/contact.js';

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(express.json({ limit: '12kb' }));
app.all('/api/contact', contactHandler);

const vite = await createViteServer({
  server: { middlewareMode: true },
  appType: 'spa',
});

app.use(vite.middlewares);

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Portfolio ready at http://localhost:${port}`);
});

const closeServer = async () => {
  server.close();
  await vite.close();
};

process.on('SIGINT', () => void closeServer());
process.on('SIGTERM', () => void closeServer());
