import express, { Request, Response } from 'express';
import { user } from '../interfeces/user.interface';
import userService from '../services/user.service';
const router = express.Router();
const users: user[] = [];

router.get('/', async (req: Request, res: Response) => {
  const { size } = req.query;
  const limit = size || 10;
  const users = await userService.find();
  console.log(users);
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
