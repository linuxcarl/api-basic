import { user } from '../interfeces/user.interface';
import { sequelize } from '../libs/sequealize';
const { models } = sequelize;
class UserService {
  contructor() {}
  async find(): Promise<any[]> {
    const data = await models.User.findAll();
    return data;
  }
}
export default new UserService();
