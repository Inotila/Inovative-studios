'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Playlist extends Model {
    static associate(models) {
      Playlist.belongsTo(models.User, { foreignKey: 'User_ID' });
    }
  }

  Playlist.init({
    Playlist_ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    User_ID: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    Tracks: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Playlist',
  });

  return Playlist;
};
