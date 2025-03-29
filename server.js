const express = require('express');

const connectDB = require('./config/db');
const moment = require('moment')

const { trackCPU } = require('./services/systmeMonitor');

const routes = require('./routes');


const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/api/v1', routes);

trackCPU();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));