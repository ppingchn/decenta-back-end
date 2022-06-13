//libary import
const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');
// Router Part
router.get('/', userControllers.getAllUsers);
router.get('/:id', userControllers.getUserById);

// Router Export
module.exports = router;
