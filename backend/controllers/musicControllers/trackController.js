const contentStore = require('../../utils/js/contentStore');

const getAllTracks = (req, res) => {
  const tracks = contentStore.getTracks();
  res.json(tracks);
};

module.exports = { getAllTracks };
