const express = require('express');
const router = express.Router();
const { getAllProjects } = require('../controllers/projectsController/projectController');

router.get('/projects', getAllProjects);

module.exports = router;
