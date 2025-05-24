import { Router } from 'express';
import productRoutes from './products/product.routes';
import sellerDataRoute from './data/data.routes';

const sellerRoute = Router();

sellerRoute.use('/products', productRoutes);
sellerRoute.use('/data', sellerDataRoute);

export default sellerRoute;
