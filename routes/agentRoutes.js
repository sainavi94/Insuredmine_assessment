const express = require('express');
const router = express.Router();

const { createAgent } = require('../controllers/agentctrl');


router.post('/create', createAgent);

module.exports = router;