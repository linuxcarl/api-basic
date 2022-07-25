import express from 'express';
import cors from 'cors';
import routerApi from './src/routers/';
import {
  errorHandler,
  logErrors,
  boomErrorHandler,
} from './src/middlewares/error.handler';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

routerApi(app);
const whiteList = ['http://localhost:3000', 'http://localhost:3001'];
const options = {
  origin: (
    origin: any,
    callback: (arg0: Error | null, arg1: boolean | undefined) => void
  ) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'), false);
    }
  },
};
app.use(cors());
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi port => ' + port);
});
