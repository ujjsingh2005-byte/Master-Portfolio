const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.get('/projects', projectController.getProjects);
router.get('/projects/:id', projectController.getProjectById);
router.post('/projects', projectController.createProject);
router.delete('/projects/:id', projectController.deleteProject);

module.exports = router;
