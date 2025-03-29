const express = require('express');
const moment = require('moment')
const router = express.Router();

const {  createUser } = require('../controllers/userctrl');


router.post('/create', createUser);

module.exports = router;