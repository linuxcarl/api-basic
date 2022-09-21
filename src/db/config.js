const config = require('../config/config_migration');
const { user = 'root', password = '' } = config.db;
const USER = encodeURIComponent(user);
const PASSWORD = encodeURIComponent(password);
const URI = `postgres://${USER}:${PASSWORD}@${config.db.host}:${config.db.port}/${config.db.database}`;
console.log({ URI });
module.exports = {
  development: {
    url: URI,
    dialect: 'postgres',
  },
  production: {
    url: URI,
    dialect: 'postgres',
  },
};
