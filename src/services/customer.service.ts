import { v4 as uuidv4 } from 'uuid';
import { sequelize } from '../libs/sequealize';
import boom from '@hapi/boom';
import { customer } from '../interfeces/customer.interface';
const { models } = sequelize;
class CustomerService {
  contructor() {}
  async find(): Promise<customer[]> {
    const data = await models.Customer.findAll();
    return data;
  }
  async findOne(id: string): Promise<customer> {
    const { dataValues: data } = (await models.Customer.findByPk(id)) || {};
    if (!data) throw boom.notFound('Customer not found');
    return data;
  }
  async create(customer: customer): Promise<customer> {
    console.log('customer=>', customer);

    const id = uuidv4();
    const createdAt = new Date();
    const { dataValues: data } = await models.Customer.create({
      ...customer,
      id,
      createdAt,
    });
    return data;
  }
  async update(id: string, customer: customer): Promise<customer> {
    await this.findOne(id);
    const updated = await models.Customer.update(
      { ...customer },
      { where: { id } }
    );
    const customerUpdated = await this.findOne(id);
    return customerUpdated;
  }
  async delete(id: string): Promise<string> {
    const customer = await this.findOne(id);
    await models.Customer.destroy({ where: { id } });
    return id;
  }
}
export default new CustomerService();
