const express = require('express');
const router = express.Router();
const { getAllServices, getServiceById } = require('../../controllers/service_controller/service_controller');

// Route to get all services
router.get('/services', getAllServices);

// Route to get a specific service by ID
router.get('/services/:id', getServiceById);

module.exports = router;