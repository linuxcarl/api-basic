const express = require('express');
import productsRouter from './products.router';
import categoriesRouter from './categories.router';
import usersRouter from './users.router';
const router = express.Router();

function routerApi(app: any) {
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);
}
export default routerApi;
