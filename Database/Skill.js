const mongoose = require('mongoose')

const SkillSchema = new Schema({
    image: String,
    name: String,
}, { _id: false });

const ServiceSchema = new Schema({
    title: String,
    image: String,
    description: String
}, { _id: false });

const Skill = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        index: { unique: true }
    },
    skills: { type: [SkillSchema] },
    services: { type: [ServiceSchema] }
})

module.exports = mongoose.model("skill", Skill)