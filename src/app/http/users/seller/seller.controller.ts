import { TEndpointHandler } from '../../../../types/express';
import SellerRepository from './seller.repository';

const sellerRepo = new SellerRepository();
const fillSellerData: TEndpointHandler = async (req) => {
  const user = req.userData;
  const { storeName, addressId, fullAddress } = req.body;

  await sellerRepo.fillData({
    user_id: user?.id,
    store_name: storeName,
    address_id: addressId,
    full_address: fullAddress,
  });

  return {
    statusCode: 200,
    message: 'Berhasil isi data',
  };
};
