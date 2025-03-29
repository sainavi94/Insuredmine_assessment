const schedule = require('node-schedule');
const Message = require('../models/message');

const scheduleMessage = (req, res) => {
  const { content, day, time } = req.body;
  if (!content || !day || !time) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const [hours, minutes] = time.split(':');
  const scheduledDate = new Date(`${day}T${hours}:${minutes}:00`);

  schedule.scheduleJob(scheduledDate, async () => {
    try {
      await Message.create({ content });
      console.log(`Message "${content}" inserted into DB`);
    } catch (error) {
      console.error('Error inserting scheduled message:', error);
    }
  });

  res.json({ message: 'Message scheduled successfully' });
};

module.exports = { scheduleMessage };