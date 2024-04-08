'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Admin }) {
      this.belongsTo(Admin, { foreignKey: 'user_id' });
    }
  }
  RefreshToken.init({
    token: DataTypes.STRING,
    is_valid: DataTypes.BOOLEAN,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RefreshToken',
  });
  return RefreshToken;
};
