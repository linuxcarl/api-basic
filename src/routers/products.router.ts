import express, { Request, Response } from 'express';
import { faker } from '@faker-js/faker';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    });
  }
  res.json(products);
});

router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'Producto ' + id,
    price: parseInt(faker.commerce.price(), 10),
    image: faker.image.imageUrl(),
  });
});

router.post('/', (req: Request, res: Response) => {
  const body = req.body;
  res.json({
    message: 'created',
    data: body,
  });
});
router.patch('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'update',
    data: body,
    id,
  });
});
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: 'deleted',
    id,
  });
});

export default router;
