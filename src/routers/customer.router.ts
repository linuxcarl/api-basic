import express, { Request, Response, NextFunction } from 'express';
import { customer } from '../interfeces/customer.interface';
import { validatorHandler } from '../middlewares/validation.handler';
import {
  createCustomerSchema,
  getCustomerSchema,
  updateCustomerSchema,
} from '../schemas/customers.schema';
import CustomerService from '../services/customer.service';
const router = express.Router();
const customers: customer[] = [];

router.get('/', async (req: Request, res: Response) => {
  const { size } = req.query;
  const limit = size || 10;
  const customer = await CustomerService.find();
  res.json(customer);
});
router.get(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const customer = await CustomerService.findOne(id);
      res.json({ ...customer });
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      console.log(body);
      const customer = await CustomerService.create(body);
      res.status(201).json({
        ...customer,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const id = req.params.id;
      const customerUpdated = await CustomerService.update(id, body);
      res.status(200).json({
        ...customerUpdated,
      });
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await CustomerService.delete(id);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
);

export default router;
