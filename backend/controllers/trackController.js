const { Track } = require('../models');

const createTrack = async (req, res) => {
  try {
    const track = await Track.create(req.body);
    res.status(201).json(track);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllTracks = async (req, res) => {
  try {
    const tracks = await Track.findAll();
    res.status(200).json(tracks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTrackById = async (req, res) => {
  try {
    const track = await Track.findByPk(req.params.id);
    if (!track) {
      return res.status(404).json({ error: 'Track not found' });
    }
    res.status(200).json(track);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTrack = async (req, res) => {
  const { id } = req.params;
  try {
    const track = await Track.findByPk(id);
    if (track) {
      await track.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Track not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createTrack, getAllTracks, getTrackById, deleteTrack };
