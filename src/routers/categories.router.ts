import express, { Request, Response } from 'express';
import { faker } from '@faker-js/faker';
const router = express.Router();
const categories: { name: string; id: string }[] = [];

router.get('/', (req: Request, res: Response) => {
  const { size } = req.query;
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    categories.push({
      name: faker.commerce.department(),
      id: faker.random.numeric(),
    });
  }
  res.json(categories);
});
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { id: categoryId, name } = categories.find(
    (category) => category.id === id
  ) || { id: '', name: '' };
  if (!categoryId) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.json({ id: categoryId, name });
});
export default router;
