import { mysqlConnection } from '../../../libs/config/mysqlConnection.js';

export default class UserRepository {
  async findAll() {
    const users = await mysqlConnection.raw<User.IUser>('SELECT * FROM users');

    return users;
  }

  async findUserByEmail(email: string) {
    const [users] = await mysqlConnection.raw<User.IUser>(
      'SELECT * FROM users WHERE email = ?',
      [email],
    );

    return users;
  }

  async addUser(payload: {
    email: string;
    name: string;
    password: string;
    role: string;
  }) {
    await mysqlConnection.transaction(async (trx) => {
      const emailExist = await this.findUserByEmail(payload.email);

      if (emailExist) {
        throw new Error('Email sudah terdaftar');
      }

      await trx.execute(
        'INSERT INTO users (email, name, password, role) VALUES (?, ?, ?, ?)',
        [payload.email, payload.name, payload.password, payload.role],
      );
    });
  }
}
