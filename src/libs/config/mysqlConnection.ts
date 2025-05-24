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
  private isInitializing = false;

  async init(): Promise<void> {
    if (this.pool || this.isInitializing) return;
    this.isInitializing = true;

    try {
      this.pool = mysql.createPool({
        host: mysqlConfig.HOST,
        user: mysqlConfig.USER,
        password: mysqlConfig.PASSWORD,
        database: mysqlConfig.DATABASE,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });

      // Test connection
      const conn = await this.pool.getConnection();
      await conn.ping();
      conn.release();

      logger.debug('✅ [MySQL] Pool initialized & ready to connect.');
    } catch (err) {
      logger.error('❌ [MySQL] Failed to init pool:', err);
      this.pool = null;
    } finally {
      this.isInitializing = false;
    }
  }

  private async ensureConnection(): Promise<void> {
    if (!this.pool) {
      await this.init();
    }
  }

  private async handleQuery<T>(
    executor: () => Promise<any>,
    retry = true,
  ): Promise<T> {
    try {
      await this.ensureConnection();
      const result = await executor();
      return result as T;
    } catch (err: any) {
      if (retry && this.isTransientError(err)) {
        logger.warn(`[MySQL] Retrying after transient error: ${err.code}`);
        this.pool = null;
        await this.init();
        return this.handleQuery<T>(executor, false); // Retry once
      }
      throw err;
    }
  }

  private isTransientError(err: any): boolean {
    return (
      err.code === 'PROTOCOL_CONNECTION_LOST' ||
      err.code === 'ECONNRESET' ||
      err.code === 'ECONNREFUSED' ||
      err.code === 'ETIMEDOUT' ||
      err.message?.includes('Pool is closed')
    );
  }

  async raw<T = any>(query: string, params?: any[]): Promise<T[]> {
    return this.handleQuery(async () => {
      const [rows] = await this.pool!.query(query, params);
      return rows as T[];
    });
  }

  async execute(query: string, params?: any[]): Promise<ResultSetHeader> {
    return this.handleQuery(async () => {
      const [result] = await this.pool!.execute(query, params);
      return result as ResultSetHeader;
    });
  }

  async transaction<T>(
    callback: (conn: PoolConnection) => Promise<T>,
  ): Promise<T> {
    return this.handleQuery(async () => {
      const connection = await this.pool!.getConnection();
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
    });
  }
}

export const mysqlConnection = new MySQLConnection();
