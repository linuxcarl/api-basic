import { Customer, CustomerSchema } from './customer.model';
import { UserSchema, User } from './user.model';

function setupModels(sequelize: any) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
}
export { setupModels };
