const os = require('os');

const trackCPU = () => {
  setInterval(() => {
    const cpus = os.cpus();
    let idleTime = 0;
    let totalTime = 0;

    cpus.forEach((cpu) => {
      for (let type in cpu.times) {
        totalTime += cpu.times[type];
        if (type === 'idle') idleTime += cpu.times[type];
      }
    });

    const usage = ((totalTime - idleTime) / totalTime) * 100;
    console.log(`CPU Usage: ${usage.toFixed(2)}%`);

    if (usage > 70) {
      console.log('CPU usage exceeded 70%, restarting server...');
      process.exit(1); // Use PM2 or similar in production for auto-restart
    }
  }, 5000); // Check every 5 seconds
};

module.exports = { trackCPU };