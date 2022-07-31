import { user } from '../interfeces/user.interface';
import pool from '../libs/postgres';

class UserService {
  private pool: any;
  contructor() {
    this.pool = pool;
    this.pool.on('error', (err: any) => {
      console.log('idle client error', err.message, err.stack);
    }
  }
  async find(): Promise<user[]> {
    const result = await this.pool.query('SELECT * FROM users');
    return result.rows;
  }
}
export default new UserService();
