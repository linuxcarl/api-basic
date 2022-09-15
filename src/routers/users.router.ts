import express, { Request, Response, NextFunction } from 'express';
import { user } from '../interfeces/user.interface';
import { validatorHandler } from '../middlewares/validation.handler';
import {
  createUserSchema,
  getUserSchema,
  updateUserSchema,
} from '../schemas/user.schema';
import userService from '../services/user.service';
const router = express.Router();
const users: user[] = [];

router.get('/', async (req: Request, res: Response) => {
  const { size } = req.query;
  const limit = size || 10;
  const users = await userService.find();
  res.json(users);
});
router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await userService.findOne(id);
      res.json({ ...user });
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const newUser = await userService.create(body);
      res.status(201).json({
        ...newUser,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const id = req.params.id;
      const updateUser = await userService.update(id, body);
      res.status(200).json({
        ...updateUser,
      });
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await userService.delete(id);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
);

export default router;
