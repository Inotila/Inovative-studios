'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class PaidContent extends Model {
    static associate(models) {
      PaidContent.belongsTo(models.User, {
        foreignKey: 'User_ID',
        as: 'User'
      });
      PaidContent.belongsTo(models.Album, {
        foreignKey: 'Album_ID',
        as: 'Album'
      });
      PaidContent.belongsTo(models.Track, {
        foreignKey: 'Track_ID',
        as: 'Track'
      });
    }
  }

  PaidContent.init({
    Paid_content_ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    User_ID: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    Album_ID: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    Track_ID: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    Paid_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  }, {
    sequelize,
    modelName: 'PaidContent',
  });

  return PaidContent;
};
