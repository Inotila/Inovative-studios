const express = require('express');
const router = express.Router();
const { getAllProjects, getProjectById } = require('../../controllers/project_controller/projectController')

// Route to get all projects
router.get('/', getAllProjects);

// Route to get a project by ID
router.get('/:id', getProjectById);

module.exports = router;
