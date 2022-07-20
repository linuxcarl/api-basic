import express, { Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import ProductService from '../services/product.service';
const router = express.Router();
const productService = new ProductService();
router.get('/', (req: Request, res: Response) => {
  const products = productService.find();
  // const { size } = req.query;
  res.json(products);
});

router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const product = productService.findOne(id);
  if (!product) {
    res.status(404).json({ message: 'Product not found' });
  } else {
    res.json({
      ...product,
    });
  }
});

router.post('/', (req: Request, res: Response) => {
  const body = req.body;
  const product = productService.create(body);
  if (!product) {
    res.status(400).json({ message: 'Product not created' });
  } else {
    res.status(201).json({
      ...product,
    });
  }
});
router.patch('/:id', (req: Request, res: Response) => {
  const body = req.body;
  const { id } = req.params;
  const product = productService.update(id, body);
  if (!product) {
    res.status(404).json({ message: 'Product not found' });
  } else {
    res.json({
      ...product,
    });
  }
});
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const idDeleted = productService.delete(id);
  res.json({
    message: 'deleted',
    ...idDeleted,
  });
});

export default router;
