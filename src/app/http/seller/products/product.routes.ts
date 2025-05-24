import { endpointHandler } from './../../../../libs/config/endpointHandler.js';
import { upload } from './../../../../middlewares/upload.middleware.js';
import { Router } from 'express';
import controller from './product.controller.js';

const router = Router();

router.post('', upload.single('image'), endpointHandler(controller.addProduct));
router.get('', endpointHandler(controller.getAll));
router.put('/stock', endpointHandler(controller.updateStockProduct));
router.put(
  '/:productId',
  upload.single('image'),
  endpointHandler(controller.updateProduct),
);
router.delete('/:productId', endpointHandler(controller.deleteProduct));

export default router;
