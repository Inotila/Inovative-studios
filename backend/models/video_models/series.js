'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Series extends Model {
    static associate(models) {
      // Define association with Video model
      Series.hasMany(models.Video, {
        foreignKey: 'Series_ID',
        as: 'Videos',
      });
    }
  }

  Series.init({
    Series_ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    Like_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    Download_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    sequelize,
    modelName: 'Series',
  });

  return Series;
};
