'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Bag extends Model {
    static associate(models) {
      // Define association with User model
      Bag.belongsTo(models.User, {
        foreignKey: 'User_ID',
      });
    }
  }

  Bag.init({
    User_ID: {
      type: DataTypes.UUID,
      references: {
        model: 'Users',
        key: 'User_ID',
      },
      allowNull: false,
    },
    Items: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Bag',
  });

  return Bag;
};
