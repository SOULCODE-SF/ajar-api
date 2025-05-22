import dotenv from 'dotenv';

dotenv.config();

export const APP_PORT = process.env.APP_PORT || 3000;
export const APP_SECRET_KEY = process.env.APP_SECRET_KEY || 'secret';

export const mysqlConfig = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  DATABASE: process.env.DB_DATABASE,
  PASSWORD: process.env.DB_PASSWORD,
  PORT: process.env.DB_PORT,
};
