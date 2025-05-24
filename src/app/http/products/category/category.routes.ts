import { Router } from 'express';
import controller from './category.controller.js';
import { endpointHandler } from '../../../../libs/config/endpointHandler.js';

const productCategoryRouter = Router();

productCategoryRouter.get('', endpointHandler(controller.getAll));
productCategoryRouter.post('', endpointHandler(controller.add));

export default productCategoryRouter;
