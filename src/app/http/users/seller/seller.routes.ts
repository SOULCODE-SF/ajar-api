import { Router } from 'express';
import controller from './seller.controller.js';
import { endpointHandler } from '../../../../libs/config/endpointHandler.js';

const sellerRouter = Router();

sellerRouter.get('/current-data', endpointHandler(controller.getCurrentData));
sellerRouter.post('/fill-data', endpointHandler(controller.fillSellerData));

export default sellerRouter;
