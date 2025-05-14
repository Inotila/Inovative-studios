// controllers/musicControllers/albumController.js

const contentStore = require('../../utils/js/contentStore');
// Get all albums from Contentful
const getAllAlbums = (req, res) => {
  const albums = contentStore.getAlbums();
  res.json(albums);
};

module.exports = { getAllAlbums };
