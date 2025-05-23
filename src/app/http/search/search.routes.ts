import { Router } from 'express';
import controller from './search.controller.js';
import { endpointHandler } from '../../../libs/config/endpointHandler.js';

const searchRouter = Router();

searchRouter.get('/address', endpointHandler(controller.searchAddress));

export default searchRouter;
