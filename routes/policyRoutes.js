const express = require('express');
const router = express.Router();

const { searchPolicyByUser, aggregatePolicies, createPolicy } = require('../controllers/policyctrl');


router.post('/create', createPolicy);
router.get('/search', searchPolicyByUser);
router.get('/aggregate', aggregatePolicies);

module.exports = router;