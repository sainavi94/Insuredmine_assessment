const Policy = require('../models/policy');
const User = require('../models/user');
const moment = require('moment');

const searchPolicyByUser = async (req, res) => {
  try {
    const { userName } = req.query;
    const user = await User.findOne({ userName });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const policies = await Policy.find({ userId: user._id })
      .populate('categoryId', 'categoryName')
      .populate('companyId', 'companyName');
    res.status(200).send({ message: "Success", data: policies });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching policies', error });
  }
};

const aggregatePolicies = async (req, res) => {
  try {
    const aggregation = await Policy.aggregate([
      {
        $group: {
          _id: '$userId',
          totalPolicies: { $sum: 1 },
          policies: { $push: { policyNumber: '$policyNumber', premium: '$premiumAmount' } },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
    ]);
    res.json(aggregation);
  } catch (error) {
    res.status(500).json({ message: 'Error aggregating policies', error });
  }
};

const createPolicy = async (req, res) => {
  try {
    const policyStartDate = moment(req.body.policyStartDate, "DD-MM-YYYY").toDate();
    const policyEndDate = moment(req.body.policyEndDate, "DD-MM-YYYY").toDate();
    req.body.policyStartDate = policyStartDate;
    req.body.policyEndDate = policyEndDate;
    const policy = new Policy(req.body);
    await policy.save();
    res.status(201).json({ success: true, data: policy });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = { searchPolicyByUser, aggregatePolicies, createPolicy };