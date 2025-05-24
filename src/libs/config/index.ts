import dotenv from 'dotenv';

dotenv.config();

export const APP_NAME = process.env.APP_NAME || 'ajar-api';
export const APP_PORT = Number(process.env.APP_PORT) || 3000;
export const APP_SECRET_KEY = process.env.APP_SECRET_KEY || 'secret';

export const mysqlConfig = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  DATABASE: process.env.DB_DATABASE,
  PASSWORD: process.env.DB_PASSWORD,
  PORT: process.env.DB_PORT,
};

export const emailConfig = {
  HOST: process.env.EMAIL_HOST,
  PORT: process.env.EMAIL_PORT,
  USER: process.env.EMAIL_USER,
  PASSWORD: process.env.EMAIL_PASSWORD,
};

export const minioConfig = {
  ENDPOINT: String(process.env.MINIO_URL),
  ACCESS_KEY: String(process.env.MINIO_ACCESS_KEY),
  SECRET_KEY: String(process.env.MINIO_SECRET_KEY),
  PORT: Number(process.env.MINIO_PORT),
  BUCKET: String(process.env.MINIO_BUCKET),
};
