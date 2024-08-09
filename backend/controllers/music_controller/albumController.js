const { Album, Track } = require('../../models');

// Create a new album
const createAlbum = async (req, res) => {
  try {
    const album = await Album.create(req.body);
    res.status(201).json(album);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all albums
const getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.findAll();
    res.status(200).json(albums);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single album by ID
const getAlbumById = async (req, res) => {
  const { id } = req.params;
  try {
    const album = await Album.findByPk(id);
    if (album) {
      res.status(200).json(album);
    } else {
      res.status(404).json({ error: 'Album not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing album by ID
const updateAlbum = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    // Find the album first
    const album = await Album.findByPk(id);

    if (album) {
      // Update the album
      await album.update(updateData);
      // Fetch the updated album
      const updatedAlbum = await Album.findByPk(id);
      res.status(200).json(updatedAlbum);
    } else {
      res.status(404).json({ error: 'Album not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an album by ID
const deleteAlbum = async (req, res) => {
  const { id } = req.params;
  try {
    const album = await Album.findByPk(id);
    if (album) {
      // Delete associated tracks first
      await Track.destroy({ where: { Album_ID: id } });

      // Then delete the album
      await album.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Album not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createAlbum, getAllAlbums, getAlbumById, updateAlbum, deleteAlbum };
