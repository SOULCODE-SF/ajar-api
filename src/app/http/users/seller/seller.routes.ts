import { Router } from 'express';
import controller from './seller.controller.js';
import { endpointHandler } from '../../../../libs/config/endpointHandler.js';

const sellerRouter = Router();

sellerRouter.post('/fill-data', endpointHandler(controller.fillSellerData));

export default sellerRouter;
