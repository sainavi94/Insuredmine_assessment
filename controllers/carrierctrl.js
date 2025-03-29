const Carrier = require('../models/carrier');

const createCarrier = async (req, res) => {
    try {
        let carrier = await Carrier.findOne({ userName: req.body.companyName });
        if (!carrier) {
            carrier = await Carrier.create(req.body);
        }
        res.status(201).json({ message: 'Carrier created', data: carrier });
    } catch (error) {
        res.status(500).json({ message: 'Error creating carrier', error: error.message });
    }
};

module.exports = { createCarrier };