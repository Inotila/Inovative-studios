'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Album extends Model {
    static associate(models) {
      Album.hasMany(models.Track, { foreignKey: 'Album_ID' });
    }
  }

  Album.init({
    Album_ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Download_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    Like_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    sequelize,
    modelName: 'Album',
  });

  return Album;
};
