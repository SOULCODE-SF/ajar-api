import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import url from 'url';
import { promises as fs } from 'fs';
import { mysqlConnection } from './libs/config/mysqlConnection.js';
import { authorizationMiddleware } from './middlewares/authorization.middlewares.js';

dotenv.config();

const app = express();
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authorizationMiddleware);

async function findRouteFiles(dir: string): Promise<string[]> {
  let results: string[] = [];
  const list = await fs.readdir(dir, { withFileTypes: true });

  for (const dirent of list) {
    const fullPath = path.join(dir, dirent.name);

    if (dirent.isDirectory()) {
      const nestedFiles = await findRouteFiles(fullPath);
      results = results.concat(nestedFiles);
    } else if (dirent.isFile() && dirent.name.endsWith('.routes.ts')) {
      results.push(fullPath);
    }
  }

  return results;
}

async function loadRoutes() {
  const baseRoutesDir = path.join(__dirname, '/app/http');
  const routeFiles = await findRouteFiles(baseRoutesDir);

  for (const file of routeFiles) {
    const routeModule = await import(file);

    if (routeModule.default && typeof routeModule.default === 'function') {
      const relativePath = path.relative(baseRoutesDir, file);
      const segments = path.dirname(relativePath).split(path.sep);
      const prefix = '/' + segments.join('/');

      app.use(prefix, routeModule.default);

      console.log(`✅ Loaded route ${prefix} from ${file}`);
    } else {
      console.warn(`⚠️  File ${file} tidak memiliki default export router`);
    }
  }
}

async function main() {
  try {
    await mysqlConnection.init();

    await loadRoutes();

    app.get('/', (_req, res) => {
      res.send('✅ Hello World!');
    });

    const PORT = process.env.APP_PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
}

main();
