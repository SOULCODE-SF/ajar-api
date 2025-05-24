import { TEndpointHandler } from '../../../../types/express';
import SellerDataRepository from './data.repository';

const sellerDataRepo = new SellerDataRepository();

const getSellerData: TEndpointHandler = async (req) => {
  const result = await sellerDataRepo.getStoreData(req.userData?.id as number);

  return {
    statusCode: 200,
    message: 'Data seller berhasil diambil',
    result,
  };
};

const fillStoreData: TEndpointHandler = async (req) => {
  const user = req.userData;
  const { store_name, description, address_id, full_address } = req.body;

  console.log(req.body);

  await sellerDataRepo.fillStoreData({
    user_id: user?.id,
    store_name,
    description,
    address_id,
    full_address,
  });

  return {
    statusCode: 200,
    message: 'Data Store berhasil diisi',
  };
};

export default {
  getSellerData,
  fillStoreData,
};
