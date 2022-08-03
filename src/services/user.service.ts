import { user } from '../interfeces/user.interface';
import pool from '../libs/postgres';

class UserService {
  private pool = pool;
  contructor() {
    this.pool.on('error', (err) => {
      console.log('Unexpected error on idle client', err);
      process.exit(-1);
    });
  }
  async find(): Promise<user[]> {
    const { rows } = await this.pool.query('SELECT * FROM users', []);
    return rows;
  }
}
export default new UserService();
