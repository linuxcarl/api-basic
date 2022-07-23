import express from 'express';
import routerApi from './src/routers/';
import {
  errorHandler,
  logErrors,
  boomErrorHandler,
} from './src/middlewares/error.handler';

const app = express();
const port = 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi port => ' + port);
});
