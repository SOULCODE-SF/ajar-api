import { Router } from 'express';
import controller from './user.controller';
import { endpointHandler } from '../../../libs/config/endpointHandler';

const userRouter = Router();

userRouter.post('', endpointHandler(controller.addUser));
userRouter.get('', endpointHandler(controller.getAllUsers));

export default userRouter;
