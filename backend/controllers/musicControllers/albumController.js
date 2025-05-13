

// Get all albums
const getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.findAll();
    console.log('Fetched albums from the database:', albums);
    res.status(200).json(albums);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { getAllAlbums};
