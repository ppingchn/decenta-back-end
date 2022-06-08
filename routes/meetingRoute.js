const express = require('express');
const router = express.Router();
const meetingControllers = require('../controllers/meetingControllers');

router.get('/', meetingControllers.getAllMeeting);
router.get('/secretary', meetingControllers.getSecretary);
router.get('/:id', meetingControllers.getMeetingById);
router.post('/create', meetingControllers.createMeeting);
router.delete('/delete/:id', meetingControllers.deleteMeeting);

module.exports = router;
