const express = require('express');
import productsRouter from './products.router';
import categoriesRouter from './categories.router';
const router = express.Router();

function routerApi(app: any) {
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
}
export default routerApi;
