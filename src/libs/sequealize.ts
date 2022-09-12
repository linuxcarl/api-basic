const Sequelize = require('Sequelize');
import { config } from '../config/config';
import { setupModels } from '../db/models';
const { user = '', password = '' } = config.db;

const USER = encodeURIComponent(user);
const PASSWORD = encodeURIComponent(password);
const URI = `postgres://${USER}:${PASSWORD}@${config.db.host}:${config.db.port}/${config.db.database}`;

const sequelize = new Sequelize(URI, { dialect: 'postgres' });
setupModels(sequelize);
sequelize.sync();
export { sequelize, models: sequelize.models };
