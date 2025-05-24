declare namespace Seller {
  interface IAddress {
    id: number;
    province: string;
    type: string;
    city: string;
    subdistrict: string;
    village: string;
    postal_code: string;
  }

  interface IDataSeller {
    id: number;
    user_id: number;
    store_name: string;
    full_address: string;
    address_id: number;
  }
}
