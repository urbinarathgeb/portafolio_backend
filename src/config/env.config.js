import dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${env}` });

const required = (key) => {
  const value = process.env[key];
  if (value === undefined) throw new Error(`Falta la variable de entorno: ${key}`);
  return value;
};

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT, 10) || 3000,
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
  DB_HOST: required('DB_HOST'),
  DB_PORT: parseInt(required('DB_PORT'), 10),
  DB_USER: required('DB_USER'),
  DB_PASSWORD: required('DB_PASSWORD'),
  DB_DATABASE: required('DB_DATABASE'),
  ALLOW_EXIT_ON_IDLE: process.env.ALLOW_EXIT_ON_IDLE === 'true',

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || '',
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '',
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || '',

  JWT_SECRET: required('JWT_SECRET'),
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '24h',
};