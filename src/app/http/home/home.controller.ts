import { mysqlConnection } from '../../../libs/config/mysqlConnection.js';
import { TEndpointHandler } from '../../../types/express.js';

const homeIndex: TEndpointHandler = async (req) => {
  const users = await mysqlConnection.raw<any>('SELECT * FROM users');

  return {
    statusCode: 200,
    message: '',
    result: {},
  };
};

export default {
  homeIndex,
};
