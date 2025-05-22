import { Router } from 'express';
import controller from './auth.controller';
import { endpointHandler } from '../../../libs/config/endpointHandler';

const authRouter = Router();

authRouter.post('/login', endpointHandler(controller.login));
authRouter.get('/me', endpointHandler(controller.authMe));

export default authRouter;
