import { Pool } from 'pg';
import { config } from '../config/config';
const { user = '', password = '' } = config.db;

const USER = encodeURIComponent(user);
const PASSWORD = encodeURIComponent(password);
const URI = `postgres://${USER}:${PASSWORD}@${config.db.host}:${config.db.port}/${config.db.database}`;
const pool = new Pool({ connectionString: URI });
export default pool;
