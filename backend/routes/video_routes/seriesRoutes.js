'use strict';
const express = require('express');
const router = express.Router();
const seriesController = require('../../controllers/video_controller/seriesController');

// Routes for series
router.get('/', seriesController.getAllSeries);
router.get('/:id', seriesController.getSeriesById);
router.post('/', seriesController.createSeries);
router.put('/:id', seriesController.updateSeries);
router.delete('/:id', seriesController.deleteSeries);

module.exports = router;
