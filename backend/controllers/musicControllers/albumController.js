const contentStore = require('../../utils/js/contentStore');

const getAllAlbums = (req, res) => {
  const albums = contentStore.getAlbums();
  res.json(albums);
};

module.exports = { getAllAlbums };
