import { mysqlConnection } from '../../../../libs/config/mysqlConnection.js';

export default class SellerRepository {
  async getData(userId: number) {
    const [data] = await mysqlConnection.raw(
      `SELECT 
        ds.*,
        a.province,
        a.city,
        a.subdistrict,
        a.village,
        a.postal_code 
      FROM data_seller ds
      JOIN address a ON a.id = ds.address_id
      WHERE ds.user_id = ?
      `,
      [userId],
    );

    return data;
  }

  async fillData(payload: User.Seller.ISeller) {
    console.log(payload);
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
