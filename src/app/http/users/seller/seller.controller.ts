import { TEndpointHandler } from '../../../../types/express';
import SellerRepository from './seller.repository.js';

const sellerRepo = new SellerRepository();

const getCurrentData: TEndpointHandler = async (req) => {
  const user = req.userData;

  const data = await sellerRepo.getData(user?.id as number);

  return {
    statusCode: 200,
    message: 'Berhasil mendapatkan data',
    result: data,
  };
};

const fillSellerData: TEndpointHandler = async (req) => {
  const user = req.userData;
  const { store_name, address_id, full_address } = req.body;
  console.log(req.body);

  await sellerRepo.fillData({
    user_id: user?.id,
    store_name,
    address_id,
    full_address,
  });

  return {
    statusCode: 200,
    message: 'Berhasil isi data',
  };
};

export default {
  fillSellerData,
  getCurrentData,
};
