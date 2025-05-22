import { TEndpointHandler } from '../../../../types/express';
import ProductCategoryRepository from './category.repository.js';

const productCategoryRepo = new ProductCategoryRepository();

const getAll: TEndpointHandler = async () => {
  const categories = await productCategoryRepo.findAll();

  return {
    message: 'Semua kategori produk',
    result: categories,
  };
};

export default {
  getAll,
};
