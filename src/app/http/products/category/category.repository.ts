import { mysqlConnection } from '../../../../libs/config/mysqlConnection';

export default class ProductCategoryRepository {
  async findAll() {
    const categories = await mysqlConnection.raw<Product.IProduct[]>(
      `SELECT * FROM product_category`,
    );

    return categories;
  }
}
