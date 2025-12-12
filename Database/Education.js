const mongoose = require('mongoose')

const EducationSchema = new Schema({
    from: String,
    to: String,
    title: String,
    name: String
}, { _id: false });

const ProjectSchema = new Schema({
    subtitle: String,
    title: String,
    link: String,
    image: String
}, { _id: false });

const Education = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        index: { unique: true }
    },
    education: { type: [EducationSchema] },
    experience: { type: [EducationSchema] },
    projects: { type: [ProjectSchema] }
})

module.exports = mongoose.model("education", Education)