import { Router } from 'express';
import { endpointHandler } from '../../../../libs/config/endpointHandler';
import controller from './data.controller';

const sellerDataRoute = Router();

sellerDataRoute.get('/store', endpointHandler(controller.getSellerData));
sellerDataRoute.post('/store', endpointHandler(controller.fillStoreData));

export default sellerDataRoute;
