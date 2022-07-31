import { Pool } from 'pg';
const pool = new Pool({
  user: 'kairos',
  host: 'localhost',
  database: 'platziverse',
  password: 'admin123',
  port: 5432,
});
export default pool;
