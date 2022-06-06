//libary import
const express = require('express');
const router = express.Router();
const departmentControllers = require('../controllers/departmentControllers');

// Router Part
router.post('/:departmentName', departmentControllers.findId);

// Router Export
module.exports = router;
