import { Router } from 'express';
import { body } from 'express-validator';
import { handleInputErrors } from './modules/middleware';
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from './handlers/product';
import {
  createUpdate,
  deleteUpdate,
  getAllUpdate,
  getOneUpdate,
  updateUpdate,
} from './handlers/update';

const router = Router();

// Product routes
router.get('/product', getProducts);
router.get('/product/:id', getOneProduct);
router.put(
  '/product/:id',
  body('name').isString(),
  handleInputErrors,
  updateProduct
);
router.post(
  '/product',
  body('name').isString(),
  handleInputErrors,
  createProduct
);
router.delete('/product/:id', deleteProduct);

// Update routes
router.get('/update', getAllUpdate);
router.get('/update/:id', getOneUpdate);
router.put(
  '/update/:id',
  body('title').optional(),
  body('body').optional(),
  body('status').isIn(['IN_PROGRESS', 'DEPRECATED', 'SHIPPED']).optional(),
  body('version').optional(),
  handleInputErrors,
  updateUpdate
);
router.post(
  '/update',
  body('title').exists().isString(),
  body('body').exists().isString(),
  body('productId').exists().isString(),
  handleInputErrors,
  createUpdate
);
router.delete('/update/:id', deleteUpdate);

// UpdatePoints routes
router.get('/updatepoint', () => {});
router.get('/updatepoint/:id', () => {});
router.put(
  '/updatepoint/:id',
  body('name').optional().isString(),
  body('description').optional().isString(),
  handleInputErrors,
  () => {}
);
router.post(
  '/updatepoint',
  body('name').isString(),
  body('description').isString(),
  body('updateId').exists().isString(),
  handleInputErrors,
  () => {}
);
router.delete('/updatepoint/:id', () => {});

router.use((err, req, res) => {
  console.error(err);
  res.status(500).json({ message: 'In route handler' });
});

export default router;
