import { UserSchema, User } from './user.model';

function setupModels(sequelize: any) {
  User.init(UserSchema, User.config(sequelize));
}
export { setupModels };
