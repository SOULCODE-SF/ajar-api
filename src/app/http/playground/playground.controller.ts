import { minioConfig } from '../../../libs/config';
import minioConnection from '../../../libs/config/minioConnection';
import logger from '../../../libs/helpers/logger';
import smtp from '../../../shared/services/smtp.service.js';
import { TEndpointHandler } from '../../../types/express';

const sendEmail: TEndpointHandler = async (req) => {
  const { email } = req.body;

  await smtp.sendMail({
    to: email,
    subject: 'Selamat Bergabung di AJAR!',
    text: 'Selamat bergabung di AJAR! Terima kasih telah mendaftar. Kami siap membantu Anda dalam Akses Jualan dan Retail.',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
        <h2 style="color: #2c3e50;">Selamat Bergabung di AJAR!</h2>
        <p>Halo,</p>
        <p>Terima kasih telah mendaftar dan bergabung dengan <strong>AJAR (Akses Jualan dan Retail)</strong>.</p>
        <p>Kami sangat senang Anda bergabung dan siap membantu Anda memperluas jaringan serta mengoptimalkan usaha retail Anda.</p>
        
        <p>Jika Anda membutuhkan bantuan atau ada pertanyaan, jangan ragu untuk menghubungi kami.</p>
  
        <hr style="border:none; border-top:1px solid #ccc;" />
  
        <p style="font-size: 14px; color: #555;">
          Salam hangat,<br />
          Tim AJAR<br />
          <a href="https://ajar.example.com" target="_blank" style="color:#3498db; text-decoration:none;">ajar.example.com</a>
        </p>
      </div>
    `,
  });

  return {
    statusCode: 200,
    message: 'Email berhasil dikirim',
  };
};

const uploadFile: TEndpointHandler = async (req) => {
  const { file } = req;

  if (!file) {
    throw new Error('File not found');
  }

  const bucket = 'ajar';
  const objectName = Date.now() + '-' + file.originalname;

  const upload = await minioConnection.putObject(
    bucket,
    objectName,
    file.buffer,
    file.size,
    {
      'Content-Type': file.mimetype,
    },
  );

  logger.info(upload);

  const fileUrl = `http://${minioConfig.ENDPOINT}:${minioConfig.PORT}/${bucket}/${objectName}`;

  return {
    statusCode: 200,
    message: 'File berhasil diupload',
    result: fileUrl,
  };
};

export default {
  sendEmail,
  uploadFile,
};
