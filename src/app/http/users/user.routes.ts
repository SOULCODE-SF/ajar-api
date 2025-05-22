import { Router } from 'express';
import controller from './user.controller.js';
import { endpointHandler } from '../../../libs/config/endpointHandler.js';

const userRouter = Router();

userRouter.post('', endpointHandler(controller.addUser));
userRouter.get('', endpointHandler(controller.getAllUsers));

export default userRouter;
