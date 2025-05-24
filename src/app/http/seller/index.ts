import { Router } from 'express';
import productRoutes from './products/product.routes.js';
import sellerDataRoute from './data/data.routes.js';

const sellerRoute = Router();

sellerRoute.use('/products', productRoutes);
sellerRoute.use('/data', sellerDataRoute);

export default sellerRoute;
