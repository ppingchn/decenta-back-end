const express = require('express');
const router = express.Router();
const projectControllers = require('../controllers/projectControllers');

router.get('/', projectControllers.getAllProject);
router.get('/:id', projectControllers.getProjectById);
router.post('/create', projectControllers.createProject);
router.delete('/delete/:id', projectControllers.deleteProject);

module.exports = router;
