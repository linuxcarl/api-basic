const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model');
const CUSTOMER_TABLE = 'customers';
const CustomerSchema = {
  id: {
    allowNull: false,
    // defaultValue: DataTypes.UUIDV1, // Or DataTypes.UUIDV1
    primaryKey: true,
    type: DataTypes.UUID,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name',
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
  },
  updatedAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'update_at',
  },
  userId: {
    allowNull: false,
    type: DataTypes.UUID,
    field: 'user_id',
    foreignKey: true,
    references: {
      model: USER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    ondelete: 'SET NULL',
  },
};
class Customer extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false,
    };
  }
}
module.exports = { CUSTOMER_TABLE, CustomerSchema, Customer };
