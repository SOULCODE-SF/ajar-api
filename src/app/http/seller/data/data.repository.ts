import { mysqlConnection } from '../../../../libs/config/mysqlConnection';

export default class SellerDataRepository {
  async getStoreData(userId: number) {
    const [data] = await mysqlConnection.raw(
      `SELECT 
        ds.*,
        a.province,
        a.type,
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

    const result = {
      user_id: data.user_id,
      store_name: data.store_name,
      description: data.description,
      full_address: data.full_address,
      address: {
        id: data?.address_id,
        province: data?.province,
        type: data?.type,
        city: data.city,
        subdistrict: data.subdistrict,
        village: data.village,
        postal_code: data.postal_code,
      },
    };

    console.log(result);

    return result;
  }

  async fillStoreData(payload: User.Seller.ISeller) {
    console.log(payload);
    await mysqlConnection.transaction(async (trx) => {
      const getData = await this.getStoreData(payload.user_id as number);

      if (getData) {
        await trx.execute(
          `UPDATE data_seller SET store_name = ?, description = ?, address_id = ?, full_address = ? WHERE user_id = ?`,
          [
            payload.store_name,
            payload.description,
            payload.address_id,
            payload.full_address,
            payload.user_id,
          ],
        );
      } else {
        await trx.execute(
          `INSERT INTO data_seller (user_id, store_name, description, address_id, full_address) VALUES(?,?,?,?,?)`,
          [
            payload.user_id,
            payload.store_name,
            payload.description,
            payload.address_id,
            payload.full_address,
          ],
        );
      }
    });
  }
}
