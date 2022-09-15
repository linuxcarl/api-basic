import { user } from '../interfeces/user.interface';
import { v4 as uuidv4 } from 'uuid';
import { sequelize } from '../libs/sequealize';
import boom from '@hapi/boom';
const { models } = sequelize;
class UserService {
  contructor() {}
  async find(): Promise<user[]> {
    const data = await models.User.findAll();
    return data;
  }
  async findOne(id: string): Promise<user> {
    const { dataValues: data } = (await models.User.findByPk(id)) || {};
    if (!data) throw boom.notFound('User not found');
    return data;
  }
  async create(user: user): Promise<user> {
    const id = uuidv4();
    const createdAt = new Date();
    const { dataValues: data } = await models.User.create({
      ...user,
      id,
      createdAt,
    });
    return data;
  }
  async update(id: string, user: user): Promise<user> {
    await this.findOne(id);
    const updated = await models.User.update({ ...user }, { where: { id } });
    const userUpdated = await this.findOne(id);
    return userUpdated;
  }
  async delete(id: string): Promise<string> {
    const user = await this.findOne(id);
    await models.User.destroy({ where: { id } });
    return id;
  }
}
export default new UserService();
