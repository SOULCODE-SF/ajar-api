import mysql, {
  Pool,
  PoolConnection,
  RowDataPacket,
  ResultSetHeader,
} from 'mysql2/promise';
import { mysqlConfig } from './index.js';
import logger from '../helpers/logger.js';

class MySQLConnection {
  private pool: Pool | null = null;

  async init(): Promise<void> {
    if (this.pool) return;

    this.pool = mysql.createPool({
      host: mysqlConfig.HOST,
      user: mysqlConfig.USER,
      password: mysqlConfig.PASSWORD,
      database: mysqlConfig.DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    logger.debug('✅ [MySQL] Pool initialized & ready to connect.');
  }

  async raw<T = any>(query: string, params?: any[]): Promise<T[]> {
    if (!this.pool) throw new Error('MySQL pool not initialized.');
    const [rows] = await this.pool.query(query, params);
    return rows as T[];
  }

  async execute(query: string, params?: any[]): Promise<ResultSetHeader> {
    if (!this.pool) throw new Error('MySQL pool not initialized.');
    const [result] = await this.pool.execute(query, params);
    return result as ResultSetHeader;
  }

  async transaction<T>(
    callback: (conn: PoolConnection) => Promise<T>,
  ): Promise<T> {
    if (!this.pool) throw new Error('MySQL pool not initialized.');
    const connection = await this.pool.getConnection();
    try {
      await connection.beginTransaction();
      const result = await callback(connection);
      await connection.commit();
      return result;
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }
}

export const mysqlConnection = new MySQLConnection();
