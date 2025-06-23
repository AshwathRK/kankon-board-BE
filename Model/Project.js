const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
})

const Project = mongoose.model('projectlist', projectSchema, );
module.exports = Project;