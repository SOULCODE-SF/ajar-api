import { endpointHandler } from './../../../../libs/config/endpointHandler';
import { upload } from './../../../../middlewares/upload.middleware';
import { Router } from 'express';
import controller from './product.controller';

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
