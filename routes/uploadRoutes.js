const express = require("express");
const multer = require("multer");
const { Worker } = require("worker_threads");
const path = require('path');

const router = express.Router();


const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post("/", upload.single("file"), async (req, res) => {
    if (!req.file) return res.status(400).json({ message: "No file uploaded." });

    const fileId = new Date().getTime().toString();
    const fileName = req.file.originalname;
    const workerFilePath = path.resolve(__dirname, "../utils/uploadWorker.js");

    const worker = new Worker(workerFilePath, {
        workerData: { fileBuffer: req.file.buffer, fileId, fileName }
    });

    worker.on("message", (message) => {
        if (message.status === "success") {
            res.status(200).json({ message: "File uploaded successfully!", fileId });
        } else {
            res.status(500).json({ message: "File processing failed!" });
        }
    });

    worker.on("error", (err) => res.status(500).json({ message: "Worker error!", error: err.message }));
});


module.exports = router;
