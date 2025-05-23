import nodemailer from 'nodemailer';
import { emailConfig } from '../../libs/config/index.js';
import logger from '../../libs/helpers/logger.js';

interface ISendMail {
  to: string;
  subject: string;
  text: string;
  html: string;
}

const transporter = nodemailer.createTransport({
  host: emailConfig.HOST,
  port: Number(emailConfig.PORT),
  secure: false,
  auth: {
    user: emailConfig.USER,
    pass: emailConfig.PASSWORD,
  },
});

const sendMail = async (payload: ISendMail) => {
  try {
    const info = await transporter.sendMail({
      from: `"<no-reply>" <${emailConfig.USER}>`,
      to: payload.to,
      subject: payload.subject,
      text: payload.text,
      html: payload.html,
    });

    return info;
  } catch (error) {
    console.error('Error sending email: ', error);
    logger.error('Error sending email: ', error);
    throw error;
  }
};

const smtp = {
  sendMail,
};

export default smtp;
