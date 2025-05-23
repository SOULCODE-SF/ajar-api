import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import url from 'url';
import { promises as fs } from 'fs';
import { mysqlConnection } from './libs/config/mysqlConnection.js';
import { authorizationMiddleware } from './middlewares/authorization.middlewares.js';
import httpRouter from './app/http/index.js';
import { APP_PORT, mysqlConfig } from './libs/config/index.js';

dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authorizationMiddleware);
app.use(httpRouter);

async function main() {
  try {
    await mysqlConnection.init();

    app.get('/', (_req, res) => {
      res.send('✅ Hello World!');
    });

    const PORT = APP_PORT || 3000;
    app.listen(PORT, () => {
      console.log('config', mysqlConfig);
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
}

main();
