const User = require('../models/user');
const moment = require("moment");

const createUser = async (req, res) => {
    try {
        let user = await User.findOne({ userName: req.body.userName });
        if (!user) {
            const formattedDob = moment(req.body.dob, "DD-MM-YYYY").toDate();
            req.body.dob = formattedDob;
            user = await User.create(req.body);
        }
        res.status(201).json({ message: 'User created', data: user });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

module.exports = { createUser };