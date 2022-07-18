import express, { Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import { user } from './interfeces/user.interface';
const router = express.Router();
const users: user[] = [];

router.get('/', (req: Request, res: Response) => {
  const { size } = req.query;
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    users.push({
      id: faker.random.numeric(),
      name: faker.name.findName(),
      jobDescriptor: faker.name.jobDescriptor(),
      username: faker.name.middleName(),
      profilePhoto: faker.image.avatar(),
      email: faker.internet.email(),
      createdAt: new Date(),
    });
  }
  res.json(users);
});
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id) || {};
  if (!user) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.json({ ...user });
});
export default router;
