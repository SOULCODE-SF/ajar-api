import { Router } from 'express';
import homeRouter from './home/home.routes';
import productCategoryRouter from './products/category/category.routes';
import authRouter from './auth/auth.routes';
import userRouter from './users/user.routes';

const httpRouter = Router();

httpRouter.use('/home', homeRouter);
httpRouter.use('/auth', authRouter);
httpRouter.use('/users', userRouter);
httpRouter.use('/products/category', productCategoryRouter);

export default httpRouter;
