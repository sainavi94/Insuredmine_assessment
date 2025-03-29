const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
    fileId: { type: String, required: true, unique: true },
    fileName: { type: String, required: true },
    data: { type: Array, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Uploads", uploadSchema);
