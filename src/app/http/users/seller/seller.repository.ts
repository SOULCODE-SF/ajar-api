import { mysqlConnection } from '../../../../libs/config/mysqlConnection.js';

export default class SellerRepository {
  async fillData(payload: User.Seller.ISeller) {
    await mysqlConnection.execute(
      `INSERT INTO data_seller (user_id, store_name, address_id, full_address) VALUES(?,?,?,?)`,
      [
        payload.user_id,
        payload.store_name,
        payload.address_id,
        payload.full_address,
      ],
    );
  }
}
