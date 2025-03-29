const Agent = require('../models/agent');

const createAgent = async (req, res) => {
  try {
    const { agentName } = req.body;
    let agent = await Agent.findOne({ agentName });
    if (!agent) {
      agent = await Agent.create({ agentName });
    }
    res.status(201).json({ message: 'Agent created', data: agent });
  } catch (error) {
    res.status(500).json({ message: 'Error creating agent', error: error.message });
  }
};

module.exports = { createAgent };