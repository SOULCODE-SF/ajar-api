declare namespace User {
  interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'seller' | 'buyer';
  }

  declare namespace Seller {
    interface ISeller {
      id?: number;
      user_id?: number;
      store_name: string;
      description?: string;
      address_id: number;
      full_address: string;
    }
  }
}
