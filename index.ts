import express from 'express';
import routerApi from './src/routers/';

const app = express();
const port = 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

routerApi(app);

app.listen(port, () => {
  console.log('Mi port => ' + port);
});
