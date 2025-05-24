declare namespace Product {
  interface IProduct {
    id?: number;
    name?: string;
    description?: string;
    image?: string;
    status?: number;
    store_name?: string;
    stok?: number;
    categories: IProductCategory[];
  }

  interface IProductCategory {
    id?: number;
    name?: string;
    icon?: string;
  }
}
