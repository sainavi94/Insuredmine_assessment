const express = require('express');
const router = express.Router();

const { createCarrier } = require('../controllers/carrierctrl');


router.post('/create', createCarrier);

module.exports = router;