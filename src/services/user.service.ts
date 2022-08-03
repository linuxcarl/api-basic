import { user } from '../interfeces/user.interface';
import sequelize from '../libs/sequealize';

class UserService {
  contructor() {}
  async find(): Promise<any[]> {
    const [data] = await sequelize.query(`SELECT * FROM users`);
    return data;
  }
}
export default new UserService();
