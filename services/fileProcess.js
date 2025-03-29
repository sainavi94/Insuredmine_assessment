const { Worker } = require('worker_threads');

const processCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./utils/csvWorker.js', { workerData: { filePath } });
    worker.on('message', (msg) => resolve(msg));
    worker.on('error', (err) => reject(err));
    worker.on('exit', (code) => {
      if (code !== 0) reject(new Error(`Worker exited with code ${code}`));
    });
  });
};

module.exports = { processCSV };