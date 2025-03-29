const { parentPort, workerData } = require('worker_threads');
const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
require('../config/db')();

const Agent = require('../models/agent');
const User = require('../models/user');
const Account = require('../models/account');
const LOB = require('../models/category');
const Carrier = require('../models/carrier');
const Policy = require('../models/policy');

const processFile = async (filePath) => {
  const rows = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => rows.push(row))
    .on('end', async () => {
      try {
        for (const row of rows) {
          let agent = await Agent.findOne({ agentName: row.agent });
          if (!agent) agent = await Agent.create({ agentName: row.agent });

          let user = await User.findOne({ email: row.email });
          if (!user) {
            user = await User.create({
              firstName: row.firstname,
              dob: new Date(row.dob),
              address: row.address,
              phoneNumber: row.phone,
              state: row.state,
              zipCode: row.zip,
              email: row.email,
              gender: row.gender || '',
              userType: row.userType,
            });
          }

          let account = await Account.findOne({ accountName: row.account_name });
          if (!account) {
            account = await Account.create({
              accountName: row.account_name,
              userId: user._id,
            });
          }

          let lob = await LOB.findOne({ categoryName: row.category_name });
          if (!lob) lob = await LOB.create({ categoryName: row.category_name });

          let carrier = await Carrier.findOne({ companyName: row.company_name });
          if (!carrier) carrier = await Carrier.create({ companyName: row.company_name });

          await Policy.create({
            policyNumber: row.policy_number,
            policyStartDate: new Date(row.policy_start_date),
            policyEndDate: new Date(row.policy_end_date),
            categoryId: lob._id,
            companyId: carrier._id,
            userId: user._id,
            agentId: agent._id,
            premiumAmount: parseFloat(row.premium_amount),
            policyType: row.policy_type,
            producer: row.producer,
            csr: row.csr,
          });
        }
        parentPort.postMessage('CSV processing completed');
      } catch (error) {
        parentPort.postMessage(`Error: ${error.message}`);
      }
    });
};

processFile(workerData.filePath);