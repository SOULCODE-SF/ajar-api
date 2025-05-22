import { mysqlConnection } from '../../../libs/config/mysqlConnection.js';
import bcryptHelper from '../../../libs/helpers/bcryptHelper.js';

export default class AuthRepository {
  async login(email: string, password: string) {
    const [user] = await mysqlConnection.raw<User.IUser>(
      'SELECT * FROM users WHERE email = ?',
      [email],
    );

    if (!user) throw new Error('Email atau Password salah');

    const isPasswordValid = bcryptHelper.comparePassword(
      password,
      user.password,
    );

    if (!isPasswordValid) throw new Error('Email atau Password salah');

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    return payload;
  }
}
