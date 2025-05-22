import { Request, Response, NextFunction } from 'express';
import { TEndpointHandler } from '../../types/express.js';
import logger from '../helpers/logger.js';

export const endpointHandler = (handler: TEndpointHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await handler(req);

      const { statusCode = 200, message, result: data } = result;

      res.status(statusCode).json({
        message,
        data,
      });
    } catch (error: any) {
      logger.error(error?.message || 'Internal Server Error');

      res.status(500).json({
        message: error?.message || 'Internal Server Error',
        data: null,
      });
    }
  };
};
