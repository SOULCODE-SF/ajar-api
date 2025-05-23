import { Router } from 'express';
import homeRouter from './home/home.routes.js';
import productCategoryRouter from './products/category/category.routes.js';
import authRouter from './auth/auth.routes.js';
import userRouter from './users/user.routes.js';
import playgroundRouter from './playground/playgorund.routes.js';
import searchRouter from './search/search.routes.js';
import sellerRouter from './users/seller/seller.routes.js';

const httpRouter = Router();

httpRouter.use('/home', homeRouter);
httpRouter.use('/auth', authRouter);
httpRouter.use('/users', userRouter);
httpRouter.use('/users/seller', sellerRouter);
httpRouter.use('/search', searchRouter);
httpRouter.use('/products/category', productCategoryRouter);
httpRouter.use('/playground', playgroundRouter);

export default httpRouter;
