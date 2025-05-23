import { TEndpointHandler } from '../../../types/express';
import SearchRepository from './search.repository.js';

const searchRepo = new SearchRepository();

const searchAddress: TEndpointHandler = async (req) => {
  const { keyword } = req.query as { keyword: string };

  const address = await searchRepo.searchAddress(keyword);
  return {
    statusCode: 200,
    message: 'Alamat ditemukan',
    result: address,
  };
};

export default {
  searchAddress,
};
