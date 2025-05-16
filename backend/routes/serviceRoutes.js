const express = require('express');
const router = express.Router();
const { getAllServices } = require('../controllers/ServiceControllers/servicesController');

router.get('/', getAllServices);

module.exports = router;
