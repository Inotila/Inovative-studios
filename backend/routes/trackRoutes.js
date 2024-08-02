const express = require('express');
const { createTrack, getAllTracks, getTrackById, deleteTrack } = require('../controllers/trackController');

const router = express.Router();

router.post('/', createTrack);
router.get('/', getAllTracks);
router.get('/:id', getTrackById);
router.delete('/:id', deleteTrack);

module.exports = router;
