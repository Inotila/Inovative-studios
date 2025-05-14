const express = require('express');
const { getAllTracks } = require('../controllers/musicControllers/trackController');

const router = express.Router();

// GET /api/tracks
router.get('/', getAllTracks);

module.exports = router;
