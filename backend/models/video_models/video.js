'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Video extends Model {
    static associate(models) {
      // Define association with Series model
      Video.belongsTo(models.Series, {
        foreignKey: 'Series_ID',
        as: 'Series',
      });
    }
  }

  Video.init({
    Video_ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    Series_ID: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    Like_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    Play_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    Download_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    sequelize,
    modelName: 'Video',
  });

  return Video;
};
