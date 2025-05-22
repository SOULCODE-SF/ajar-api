import jwt from 'jsonwebtoken';
import { TEndpointHandler } from '../../../types/express';
import AuthRepository from './auth.repository';
import { APP_SECRET_KEY } from '../../../libs/config';

const authRepo = new AuthRepository();

const login: TEndpointHandler = async (req) => {
  const { email, password } = req.body;

  const payload = await authRepo.login(email, password);

  const token = jwt.sign(payload, APP_SECRET_KEY, {
    expiresIn: '1d',
  });

  return {
    statusCode: 200,
    message: 'Login berhasil',
    result: {
      userId: payload.id,
      token,
    },
  };
};

const authMe: TEndpointHandler = async (req) => {
  const userData = req.userData;
  return {
    statusCode: 200,
    message: 'Auth',
    result: userData,
  };
};

export default {
  login,
  authMe,
};
