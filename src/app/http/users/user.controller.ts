import { TEndpointHandler } from '../../../types/express.js';
import UserRepository from './user.repository';
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
