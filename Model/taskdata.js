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
        enum: ['todo', 'inprogress', 'done'],
        default: 'todo'
    },
    userId: {
        type: String,
        required: true
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
        enum: ['low', 'medium', 'high'],
        default: 'low'
    },
}, { timestamps: true });

const Task = mongoose.model('task_data', taskschema, );
module.exports = Task;