const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.post('/members', projectController.createMember);
router.post('/projects', projectController.createProject);
router.get('/projects', projectController.getProjects);
router.post('/projects/:projectId/images', projectController.addImageToProject);
router.delete('/projects/:projectId/images/:imageId', projectController.deleteImageFromProject);

module.exports = router;
