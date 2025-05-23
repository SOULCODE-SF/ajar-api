import { mysqlConnection } from '../../../../libs/config/mysqlConnection.js';

export default class SellerRepository {
  async getData(userId: number) {
    const [data] = await mysqlConnection.raw(
      `SELECT * FROM data_seller WHERE user_id = ?`,
      [userId],
    );

    return data;
  }

  async fillData(payload: User.Seller.ISeller) {
    await mysqlConnection.transaction(async (trx) => {
      const getData = await this.getData(payload.user_id as number);

      if (getData) {
        await trx.execute(
          `UPDATE data_seller SET store_name = ?, address_id = ?, full_address = ? WHERE user_id = ?`,
          [
            payload.store_name,
            payload.address_id,
            payload.full_address,
            payload.user_id,
          ],
        );
      } else {
        await trx.execute(
          `INSERT INTO data_seller (user_id, store_name, address_id, full_address) VALUES(?,?,?,?)`,
          [
            payload.user_id,
            payload.store_name,
            payload.address_id,
            payload.full_address,
          ],
        );
      }
    });
  }
}
