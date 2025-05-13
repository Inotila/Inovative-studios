'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Track extends Model {
    static associate(models) {
      // A track belongs to an album
      Track.belongsTo(models.Album, { foreignKey: 'Album_ID', as: 'album' });
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
    Album_ID: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Album',
        key: 'Album_ID',
      },
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
  }, {
    sequelize,
    modelName: 'Track',
  });

  return Track;
};

const album = await Album.findOne({
    where: { Album_ID: 'some-album-id' },
    include: { model: Track, as: 'tracks' }  // Include tracks for this album
  });
  
  console.log(album.tracks);  // Tracks related to the album
  