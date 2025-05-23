import { Router } from 'express';
import homeRouter from './home/home.routes.js';
import productCategoryRouter from './products/category/category.routes.js';
import authRouter from './auth/auth.routes.js';
import userRouter from './users/user.routes.js';

const httpRouter = Router();

httpRouter.use('/home', homeRouter);
httpRouter.use('/auth', authRouter);
httpRouter.use('/users', userRouter);
httpRouter.use('/products/category', productCategoryRouter);

export default httpRouter;
