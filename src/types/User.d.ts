declare namespace User {
  interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'seller' | 'buyer';
  }
}
