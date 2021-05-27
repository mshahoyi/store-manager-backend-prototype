import express from 'express';
import { protect } from '../controllers/authController';
import { upload } from '../utils/multer';
import { validatePayload } from '../controllers/sharedController';
import {
  deleteProduct,
  extractCreateProductPayload,
  getProducts,
  writeProduct,
} from '../controllers/productController';
import { productCreateSchema } from '../model/productModel';

const productRoute = express.Router();

productRoute.post(
  '/',
  protect,
  upload.single('image'),
  extractCreateProductPayload,
  validatePayload(productCreateSchema),
  writeProduct(false)
);

productRoute.patch(
  '/:id',
  protect,
  upload.single('image'),
  extractCreateProductPayload,
  writeProduct(true)
);

productRoute.get('/:storeId/:id?', protect, getProducts);

productRoute.delete('/:id', protect, deleteProduct);

export default productRoute;
