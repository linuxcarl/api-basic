import { config } from '../config/config';
const { user = '', password = '' } = config.db;

const USER = encodeURIComponent(user);
const PASSWORD = encodeURIComponent(password);
const URI = `postgres://${USER}:${PASSWORD}@${config.db.host}:${config.db.port}/${config.db.database}`;
const development = {
    url: URI,
    dialect: 'postgres',
  },
  production = {
    url: URI,
    dialect: 'postgres',
  };
export { development, production };
