import { ResultSetHeader } from 'mysql2';
import { mysqlConnection } from '../../../../libs/config/mysqlConnection';

export default class SellerProductRepository {
  async getAll(sellerId: number, keyword?: string) {
    const [products] = await mysqlConnection.raw(
      `CALL search_products(?, 2, ?);`,
      [keyword || '', sellerId],
    );

    const productCategories = await mysqlConnection.raw<{
      product_id: number;
      category_id: number;
      name: string;
    }>(
      `
      SELECT
        pc.product_id,
        pc.category_id,
        c.name
      FROM product_categories pc 
      JOIN category_product c ON c.id = pc.category_id;
      `,
    );

    // Gabungkan kategori ke masing-masing produk
    const result = products.map((product: Product.IProduct) => {
      const categories = productCategories
        .filter((cat) => cat.product_id === product.id)
        .map((cat) => ({
          id: cat.category_id,
          name: cat.name,
        }));

      return {
        ...product,
        categories,
      };
    });

    return result;
  }

  async add(payload: Product.IProduct, sellerId: number) {
    console.log(payload, sellerId);
    await mysqlConnection.transaction(async (trx) => {
      const [result] = await trx.execute<ResultSetHeader>(
        `INSERT INTO products (name, description, image, seller_id) VALUES(?,?,?,?)`,
        [payload.name, payload.description, payload.image, sellerId],
      );

      for (const category of payload.categories) {
        await trx.execute(
          `INSERT INTO product_categories (product_id, category_id) VALUES(?,?)`,
          [result.insertId, category.id],
        );
      }
    });
  }

  async update(payload: Product.IProduct, productId: number) {
    await mysqlConnection.transaction(async (trx) => {
      if (payload?.image) {
        await trx.execute(
          `UPDATE products SET name = ?, description = ?, image = ?, status = ? WHERE id = ?`,
          [
            payload.name,
            payload.description,
            payload.image,
            payload.status,
            productId,
          ],
        );
      } else {
        await trx.execute(
          `UPDATE products SET name = ?, description = ?, status = ? WHERE id = ?`,
          [payload.name, payload.description, payload.status, productId],
        );
      }

      await trx.execute(`DELETE FROM product_categories WHERE product_id = ?`, [
        productId,
      ]);

      for (const category of payload.categories) {
        await trx.execute(
          `INSERT INTO product_categories (product_id, category_id) VALUES(?,?)`,
          [productId, category.id],
        );
      }
    });
  }

  async delete(productId: number) {
    await mysqlConnection.execute(`DELETE FROM products WHERE id = ?`, [
      productId,
    ]);
  }

  async getCurrentStock(productId: number) {
    const [currentStok] = await mysqlConnection.raw<{ quantity: number }>(
      'SELECT IFNULL(SUM(s.quantity), 0) AS quantity FROM stocks s WHERE s.product_id = ?',
      [productId],
    );

    return currentStok.quantity;
  }

  async updateStock(productId: number, stock: number) {
    await mysqlConnection.transaction(async (trx) => {
      const currentStock = await this.getCurrentStock(productId);

      let quantity = 0;
      let type = 'in';
      if (currentStock < stock) {
        quantity = stock - currentStock;
      } else {
        quantity = currentStock - stock;
        type = 'out';
      }

      await trx.execute(
        `INSERT INTO stocks (product_id, quantity, type) VALUES(?,?,?)`,
        [productId, quantity, type],
      );
    });
  }
}
