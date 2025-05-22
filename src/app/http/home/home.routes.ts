import { Router } from 'express';
import controller from './home.controller.js';
import { endpointHandler } from '../../../libs/config/endpointHandler.js';

const homeRouter = Router();

homeRouter.get('/', endpointHandler(controller.homeIndex));

export default homeRouter;
