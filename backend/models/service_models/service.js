'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Service extends Model {
    static associate(models) {
      // Define associations here if necessary
    }
  }

  Service.init({
    Service_ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Type: {
      type: DataTypes.ARRAY(DataTypes.STRING), 
      allowNull: false,
    },
    General_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Thumbnail_cover: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    Availability: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['Open to work', 'On assignment', 'Unavailable', 'Open to enquiry']],
      },
    },
  }, {
    sequelize,
    modelName: 'Service',
  });

  return Service;
};
