import { Router } from 'express';
import { body } from 'express-validator';
import { handleInputErrors } from './modules/middleware';
import { createProduct, getProducts } from './handlers/product';

const router = Router();

// Product routes
router.get('/product', getProducts);
router.get('/product/:id', () => {});
router.put(
  '/product/:id',
  body('name').isString(),
  handleInputErrors,
  (req, res) => {}
);
router.post(
  '/product',
  body('name').isString(),
  handleInputErrors,
  createProduct
);
router.delete('/product/:id', () => {});

// Update routes
router.get('/update', () => {});
router.get('/update/:id', () => {});
router.put(
  '/update/:id',
  body('title').optional(),
  body('body').optional(),
  body('status').isIn(['IN_PROGRESS', 'DEPRECATED', 'SHIPPED']),
  body('version').optional(),
  handleInputErrors,
  () => {}
);
router.post(
  '/update',
  body('title').exists().isString(),
  body('body').exists().isString(),
  handleInputErrors,
  () => {}
);
router.delete('/update/:id', () => {});

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

export default router;
