import { Router } from 'express';
import controller from './playground.controller.js';
import { endpointHandler } from '../../../libs/config/endpointHandler.js';

const playgroundRouter = Router();

playgroundRouter.post('/send-email', endpointHandler(controller.sendEmail));

export default playgroundRouter;
