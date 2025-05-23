import { mysqlConnection } from '../../../libs/config/mysqlConnection.js';

export default class SearchRepository {
  async searchAddress(keyword: string) {
    const address = await mysqlConnection.raw(
      `CALL sp_search_address_by_ngram('${keyword}')`,
    );

    return address[0];
  }
}
