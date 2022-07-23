import express, { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import ProductService from '../services/product.service';
const router = express.Router();
const productService = new ProductService();
router.get('/', async (req: Request, res: Response) => {
  const products = await productService.find();
  // const { size } = req.query;
  res.json(products);
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const product = await productService.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const product = await productService.create(body);
    res.status(201).json({
      ...product,
    });
  } catch (error) {
    next(error);
  }
});
router.patch(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const { id } = req.params;
      const product = await productService.update(id, body);
      res.json({
        ...product,
      });
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const idDeleted = await productService.delete(id);
      res.json({
        message: 'deleted',
        ...idDeleted,
      });
    } catch (error) {
      next(error);
    }
  }
);
export default router;
