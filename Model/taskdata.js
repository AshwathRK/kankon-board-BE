const mongoose = require('mongoose');

const taskschema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'todo'
    },
    userId: {
        type: String,
    },
    projectId: {
        type: String,
        required: true
    },
    dueDate	: {
        type: Date,
        required: true
    },
    priority	: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'low'
    },
}, { timestamps: true });

const Task = mongoose.model('task_data', taskschema, );
module.exports = Task;