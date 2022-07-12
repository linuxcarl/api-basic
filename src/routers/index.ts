const express = require('express');
import productsRouter from './products.router';
const router = express.Router();

function routerApi(app: any) {
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
}
export default routerApi;
