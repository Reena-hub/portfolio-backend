const mongoose = require('mongoose')

const User = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        index: { unique: true }
    },
    name: { 
        type: String,
        required: true 
    },
    title: { 
        type: String,
        required: true 
    },
    description: { 
        type: String,
        required: true 
    }
}, { timestamps: true })