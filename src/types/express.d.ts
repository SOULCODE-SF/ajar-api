import { Request } from 'express';

declare module 'express' {
  export interface Request {
    userData?: Entity.User;
    userId?: number;
  }
}

declare namespace Entity {
  interface User {
    id: number;
    email: string;
    nama: string;
    role: 'admin' | 'seller' | 'buyer';
  }
}

export type TResponsePayload = {
  statusCode?: 200 | 201 | 400 | 404 | 403 | 500;
  message: string;
  result?: Record<string, any> | any[] | string | number | null;
};

export type TEndpointHandler = (req: Request) => Promise<TResponsePayload>;
