const express = require('express');
const { createAlbum, getAllAlbums, getAlbumById, updateAlbum, deleteAlbum } = require('../../controllers/music_controller/albumController');

const router = express.Router();

router.post('/', createAlbum);
router.get('/', getAllAlbums);
router.get('/:id', getAlbumById);
router.put('/:id', updateAlbum);
router.delete('/:id', deleteAlbum); 

module.exports = router;
