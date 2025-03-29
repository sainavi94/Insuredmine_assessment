const { parentPort, workerData } = require("worker_threads");
const mongoose = require("mongoose");
const XLSX = require("xlsx");
const { parse } = require("csv-parse/sync");
const uploadMongoDB = require('../models/upload');


async function connectToMongoDB() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect("mongodb://localhost:27017/yourDatabaseName", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Worker connected to MongoDB");
    }
}
async function processFile() {
    try {
        await connectToMongoDB();

        const { fileBuffer, fileName, fileId } = workerData;
        let jsonData = [];

        if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls")) {

            const workbook = XLSX.read(fileBuffer, { type: "buffer" });
            const sheetName = workbook.SheetNames[0];
            jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        } else if (fileName.endsWith(".csv")) {

            const csvString = fileBuffer.toString("utf-8");
            jsonData = parse(csvString, { columns: true, skip_empty_lines: true });
        } else {
            throw new Error("Unsupported file format. Upload CSV or XLSX only.");
        }

        const fileDoc = new uploadMongoDB({
            fileId,
            fileName,
            fileData: jsonData,
        });

        await fileDoc.save();

        parentPort.postMessage({ status: "success", fileId: fileDoc._id });
    } catch (error) {
        parentPort.postMessage({ status: "error", error: error.message });
    }
}

// Start processing the file
processFile();
