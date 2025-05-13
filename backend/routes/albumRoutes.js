const express = require('express');
const { getAllAlbums } = require('../controllers/musicControllers/albumController');

const router = express.Router();

router.get('/', getAllAlbums);

module.exports = router;