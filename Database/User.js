const mongoose = require('mongoose')

const SocialSchema = new Schema({
    url: String,
    image: String,
}, { _id: false });

const User = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        index: { unique: true }
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        match: [/^[6-9]{1}[0-9]{9}$/, "Invalid phone number"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    place: {
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
    },
    shortDescription: {
        type: String,
        required: true
    },
    resume: {
        type: String
    },
    socialMedia: { type: [SocialSchema] },
    password: { type: String, required: true },
    token: { type: String, default: "" }
}, { timestamps: true })

module.exports = mongoose.model("user", User)