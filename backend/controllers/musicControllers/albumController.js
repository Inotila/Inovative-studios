// controllers/musicControllers/albumController.js
const { fetchAndStoreContentfulData } = require('../../utils/js/contentfulService'); 

// Get all albums from Contentful
const getAllAlbums = async (req, res) => {
  try {
    // Fetch albums from Contentful
    const albums = await fetchAndStoreContentfulData(); 
    console.log('Fetched aalbums from Contentful:', albums);
    res.status(200).json(albums);
  } catch (error) {
    console.error('Error fetching albums:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllAlbums };
