'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Track extends Model {
    static associate(models) {
      Track.belongsTo(models.Album, { foreignKey: 'Album_ID' });
    }
  }

  Track.init({
    Track_ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Play_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    Download_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    Like_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    Album_ID: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Track',
  });

  return Track;
};
