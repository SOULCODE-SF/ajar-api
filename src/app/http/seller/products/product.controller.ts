import { minioConfig } from '../../../../libs/config/index.js';
import minioConnection from '../../../../libs/config/minioConnection.js';
import { TEndpointHandler } from '../../../../types/express';
import SellerProductRepository from './product.repository.js';
import { TAddProductSeller } from './product.request.js';

const productRepo = new SellerProductRepository();

const addProduct: TEndpointHandler = async (req) => {
  const user = req.userData;

  const { name, description, categoryIds } = req.body as TAddProductSeller;

  const file = req.file;

  if (!file) {
    throw new Error('File not found');
  }

  const categories = categoryIds?.map((id) => ({ id })) || [];

  const sanitized = name.toLowerCase().replace(/\s+/g, '_');
  const objectName = `${Date.now()}_${sanitized}`;

  await minioConnection.putObject(
    minioConfig.BUCKET,
    objectName,
    file.buffer,
    file.size,
    {
      'Content-Type': file.mimetype,
    },
  );

  const fileUrl = `http://${minioConfig.ENDPOINT}:${minioConfig.PORT}/${minioConfig.BUCKET}/${objectName}`;

  await productRepo.add(
    {
      name,
      description,
      image: fileUrl,
      categories,
    },
    user?.id as number,
  );

  return {
    statusCode: 200,
    message: 'Berhasil menambahkan produk',
  };
};

const getAll: TEndpointHandler = async (req) => {
  const keyword = req.query.keyword as string;

  const products = await productRepo.getAll(
    req.userData?.id as number,
    keyword,
  );

  return {
    statusCode: 200,
    message: 'Semua produk',
    result: products,
  };
};

const updateProduct: TEndpointHandler = async (req) => {
  const { productId } = req.params as unknown as { productId: number };
  const { name, description, status, categoryIds } =
    req.body as TAddProductSeller;
  const file = req.file;

  console.log(file);

  if (!productId) {
    throw new Error('Product id not found');
  }

  const currentStock = await productRepo.getCurrentStock(productId);

  if (currentStock == 0 && status === 1) {
    throw new Error('Produk harus memiliki stok, untuk dijual');
  }

  const categories = categoryIds?.map((id) => ({ id })) || [];

  if (file) {
    const sanitized = name.toLowerCase().replace(/\s+/g, '_');
    const objectName = `${Date.now()}_${sanitized}`;

    await minioConnection.putObject(
      minioConfig.BUCKET,
      objectName,
      file.buffer,
      file.size,
      {
        'Content-Type': file.mimetype,
      },
    );

    const fileUrl = `http://${minioConfig.ENDPOINT}:${minioConfig.PORT}/${minioConfig.BUCKET}/${objectName}`;

    await productRepo.update(
      {
        name,
        description,
        image: fileUrl,
        status,
        categories,
      },
      productId,
    );
  } else {
    await productRepo.update(
      {
        name,
        description,
        status,
        categories,
      },
      productId,
    );
  }

  console.log('siniii');

  return {
    statusCode: 200,
    message: 'Berhasil mengupdate produk',
  };
};

const deleteProduct: TEndpointHandler = async (req) => {
  const { productId } = req.params as unknown as { productId: number };
  if (!productId) {
    throw new Error('Product id not found');
  }

  await productRepo.delete(productId);

  return {
    statusCode: 200,
    message: 'Berhasil menghapus produk',
  };
};

const updateStockProduct: TEndpointHandler = async (req) => {
  const { productId, stock } = req.body;

  if (!productId) {
    throw new Error('Product id tidak boleh kosong');
  }

  await productRepo.updateStock(productId, stock);

  return {
    statusCode: 200,
    message: 'Berhasil mengupdate stock',
  };
};

export default {
  addProduct,
  getAll,
  updateProduct,
  deleteProduct,
  updateStockProduct,
};
