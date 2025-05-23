import logger from '../../../libs/helpers/logger.js';
import emailTemplate from '../../../libs/templates/email.template.js';
import smtp from '../../../shared/services/smtp.service.js';
import { TEndpointHandler } from '../../../types/express.js';
import UserRepository from './user.repository.js';
import bcrypt from 'bcrypt';

const userRepo = new UserRepository();

const addUser: TEndpointHandler = async (req) => {
  const { email, name, password, role } = req.body;

  if (!email || !name || !password || !role) {
    throw new Error('Semua field harus diisi');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await userRepo.addUser({
    email,
    name,
    password: hashedPassword,
    role,
  });

  const sendEmail = await smtp.sendMail({
    to: email,
    subject: emailTemplate.welcomeMessage.subject,
    text: emailTemplate.welcomeMessage.text,
    html: emailTemplate.welcomeMessage.html.replace('[nama]', name),
  });

  logger.info(sendEmail);

  return {
    statusCode: 201,
    message: 'Pengguna berhasil ditambahkan',
  };
};

const getAllUsers: TEndpointHandler = async () => {
  const users = await userRepo.findAll();
  return {
    statusCode: 200,
    message: 'Semua pengguna',
    result: users,
  };
};

export default {
  addUser,
  getAllUsers,
};
