//libary import
const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers');
const upload = require('../middleware/uploadMiddleware');

// Router Part

router.post('/login', authControllers.login);
router.post('/register', upload.single('profilePic'), authControllers.register);

// Router Export
module.exports = router;
