import { mysqlConnection } from '../../../../libs/config/mysqlConnection.js';

export default class ProductCategoryRepository {
  async findAll(keyword?: string) {
    let query = `SELECT * FROM category_product`;

    if (keyword) {
      query += ` WHERE name LIKE '%${keyword}%'`;
    }
    const categories = await mysqlConnection.raw<Product.IProduct[]>(query, [
      keyword,
    ]);

    return categories;
  }

  async add(name: string) {
    const [exist] = await mysqlConnection.raw(
      `SELECT * FROM category_product WHERE name = ?`,
      [name],
    );

    if (exist) throw new Error('Kategori sudah ada');

    await mysqlConnection.raw(
      `INSERT INTO category_product (name) VALUES (?)`,
      [name],
    );
  }
}
