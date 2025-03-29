const express = require('express');
const router = express.Router();

const {  createCategory } = require('../controllers/categoryctrl');


router.post('/create', createCategory);

module.exports = router;