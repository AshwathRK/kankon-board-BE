const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    projectId: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Status = mongoose.model('Status', statusSchema, );
module.exports = Status;

