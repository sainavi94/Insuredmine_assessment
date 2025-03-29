const express = require("express");
const agentRoutes = require("./agentRoutes");
const userRoutes = require("./userRoutes");
const policyRoutes = require("./policyRoutes");
const categoryRoutes = require('./categoryRoutes');
const scheduleRoutes = require('./scheduleRoutes');
const carrierRoutes = require('./carrierRoutes');
const uploadRoutes = require('./uploadRoutes');
const moment =require('moment')




const router = express.Router();

router.use("/agent", agentRoutes);
router.use("/user", userRoutes);
router.use("/policy", policyRoutes);
router.use('/category', categoryRoutes);
router.use('/schedule', scheduleRoutes);
router.use('/carrier', carrierRoutes);
router.use('/upload', uploadRoutes)

module.exports = router;
