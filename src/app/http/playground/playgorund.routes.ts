import { Router } from 'express';
import controller from './playground.controller.js';
import { endpointHandler } from '../../../libs/config/endpointHandler.js';
import multer from 'multer';
import { upload } from '../../../middlewares/upload.middleware.js';

const playgroundRouter = Router();

playgroundRouter.post('/send-email', endpointHandler(controller.sendEmail));
playgroundRouter.post(
  '/upload-file',
  upload.single('file'),
  endpointHandler(controller.uploadFile),
);

export default playgroundRouter;
