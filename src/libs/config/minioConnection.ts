import { Client } from 'minio';
import { minioConfig } from './index.js';

const minioConnection = new Client({
  endPoint: minioConfig.ENDPOINT,
  port: 9000,
  useSSL: false,
  accessKey: minioConfig.ACCESS_KEY,
  secretKey: minioConfig.SECRET_KEY,
});

export default minioConnection;
