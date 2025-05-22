import { Router } from 'express';
import controller from './category.controller';
import { endpointHandler } from '../../../../libs/config/endpointHandler';

const productCategoryRouter = Router();

productCategoryRouter.get('', endpointHandler(controller.getAll));

export default productCategoryRouter;
