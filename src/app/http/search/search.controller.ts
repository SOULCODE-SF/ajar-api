import { TEndpointHandler } from '../../../types/express';
import SearchRepository from './search.repository.js';

const searchRepo = new SearchRepository();

const searchAddress: TEndpointHandler = async (req) => {
  const { keyword, limit = 10 } = req.query as unknown as {
    keyword: string;
    limit: number;
  };

  const address = await searchRepo.searchAddress(keyword, limit);

  return {
    statusCode: 200,
    message: 'Alamat ditemukan',
    result: address,
  };
};

export default {
  searchAddress,
};
