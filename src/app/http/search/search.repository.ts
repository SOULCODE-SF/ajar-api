import { mysqlConnection } from '../../../libs/config/mysqlConnection.js';

export default class SearchRepository {
  async searchAddress(keyword: string, limit: number) {
    const address = await mysqlConnection.raw(
      `CALL sp_search_address_by_ngram('${keyword}', ?)`,
      [limit],
    );

    return address[0];
  }
}
