import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { mysqlConnection } from './libs/config/mysqlConnection.js';
import { authorizationMiddleware } from './middlewares/authorization.middlewares.js';
import httpRouter from './app/http/index.js';
import { APP_PORT, mysqlConfig } from './libs/config/index.js';
import logger from './libs/helpers/logger.js';

dotenv.config();

const app = express();

app.use(cors());
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
    app.listen(PORT, '0.0.0.0', () => {
      logger.debug(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
}

main();
