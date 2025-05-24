import { Router } from 'express';
import { endpointHandler } from '../../../../libs/config/endpointHandler.js';
import controller from './data.controller.js';

const sellerDataRoute = Router();

sellerDataRoute.get('/store', endpointHandler(controller.getSellerData));
sellerDataRoute.post('/store', endpointHandler(controller.fillStoreData));

export default sellerDataRoute;
