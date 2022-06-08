//libary import
const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers');
const upload = require('../middleware/uploadMiddleware');
const authenticate = require('../middleware/authenticateMiddelware');

// Router Part
router.get('/user', authenticate, authControllers.getUser);
router.post('/login', authControllers.login);
router.post('/register', upload.single('profilePic'), authControllers.register);

// Router Export
module.exports = router;
