const express = require('express');
const router = express.Router();

const { scheduleMessage } = require('../controllers/schedulectrl');


router.post('/schedule-message', scheduleMessage);

module.exports = router;