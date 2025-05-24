import { TEndpointHandler } from '../../../../types/express';
import ProductCategoryRepository from './category.repository.js';

const productCategoryRepo = new ProductCategoryRepository();

const getAll: TEndpointHandler = async (req) => {
  const { keyword } = req.query as unknown as { keyword?: string };

  const categories = await productCategoryRepo.findAll(keyword);

  return {
    message: 'Semua kategori produk',
    result: categories,
  };
};

const add: TEndpointHandler = async (req) => {
  const { name } = req.body;
  await productCategoryRepo.add(name);
  return {
    statusCode: 201,
    message: 'Kategori berhasil ditambahkan',
  };
};

export default {
  getAll,
  add,
};
