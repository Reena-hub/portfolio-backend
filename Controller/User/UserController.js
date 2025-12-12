const User = require("../../Database/User");
const Responder = require("../../Helpers/Responder");
const uniqid = require('uniqid');
const Utils = require("../../Helpers/Utils");

function UserController() {
    this.create = async (req, res) => {
        try {
            if (req?.files?.resume) {
                const data = req.body
                const checkExists = await User.findOne({ $or: [{ phone: data.phone }, { email: data.email }] }).lean()
                if (!checkExists) {
                    let userId = 'USER' + uniqid()
                    let pdf = await Utils.uploadFiles({
                        fileName: "resume",
                        folderName: `${userId}/`,
                        source: req?.files?.resume[0]?.buffer,
                        type: "raw"
                    })
                    if (pdf?.success) {
                        const createUser = await User.create({
                            userId,
                            name: data.name,
                            phone: data.phone,
                            email: data.email,
                            password: Utils.createHashPwd(data.password),
                            place: data.place,
                            title: data.title,
                            description: data.description,
                            shortDescription: data.shortDescription,
                            socialMedia: data.socialMedia,
                            resume: pdf?.url
                        })
                        if (createUser) {
                            return Responder?.sendSuccessMessage(res, "User created successfully")
                        } else {
                            return Responder?.sendFailureMessage(res, "Unable to create user")
                        }
                    } else {
                        return Responder?.sendFailureMessage(res, pdf?.msg || "Unable to upload pdf")
                    }

                } else {
                    return Responder.sendFailureMessage(res, `${data?.phone === checkExists?.phone ? "Phone number" : "Email ID"} already exists`)
                }
            } else {
                return Responder?.sendFailureMessage(res, "Resume is required")
            }
        } catch (err) {
            return Responder.sendFailureMessage(res, "Something went wrong!")
        }
    }
    this.update = async (req, res) => {
        try {
            const data = req.body
            const userId = req?.params?.userId
            const checkExists = await User.findOne({ userId: { $ne: userId }, $or: [{ phone: data.phone }, { email: data.email }] }).lean()
            if (checkExists) { return Responder.sendFailureMessage(res, `${data?.phone === checkExists?.phone ? "Phone number" : "Email ID"} already exists`) }
            const userData = await User?.findOne({ userId }).lean()
            if (!userData) { return Responder?.sendFailureMessage(res, "User not found") }
            let pdfUrl = userData?.resume
            if (req?.files?.resume) {
                let pdf = await Utils.uploadFiles({
                    fileName: "resume",
                    folderName: `${userId}/`,
                    source: req?.files?.resume[0]?.buffer,
                    type: "raw"
                })
                if (!pdf?.success) { return Responder?.sendFailureMessage(res, pdf?.msg || "Unable to upload pdf") }
                pdfUrl = pdf?.url
            }
            const createUser = await User.updateOne({ userId }, {
                $set: {
                    name: data.name,
                    phone: data.phone,
                    email: data.email,
                    place: data.place,
                    title: data.title,
                    description: data.description,
                    shortDescription: data.shortDescription,
                    socialMedia: data.socialMedia,
                    resume: pdf?.url
                }
            })
            if (createUser?.modifiedCount) {
                return Responder?.sendSuccessMessage(res, "User created successfully")
            } else {
                return Responder?.sendSuccessMessage(res, "No changes made")
            }
        } catch (err) {
            return Responder.sendFailureMessage(res, "Something went wrong!")
        }
    }
    this.educationUpdate = async (req, res) => {
        try {
            const userId = req.params.userId;
            const rawProjects = req.body.projects || {};
            const projects = [];
            const projectCount = Object.keys(rawProjects).length;
            let fileIndex = 0;
            for (let i = 0; i < projectCount; i++) {
                const p = rawProjects[i];
                let imageUrl = "";
                if (req.files[fileIndex]) {
                    const uploaded = await Utils.uploadFiles({
                        fileName: `project-${i}`,
                        folderName: `${userId}/projects/`,
                        source: req.files[fileIndex].buffer,
                        type: "raw"
                    });
                    imageUrl = uploaded.url;
                    fileIndex++;
                } else {
                    imageUrl = p.image || "";
                }
                projects.push({ title: p.title, subtitle: p.subtitle, link: p.link, image: imageUrl });
            }
            await Education.updateOne({ userId }, { $set: { projects } }, { upsert: true });
            return Responder.sendSuccessMessage(res, "Projects updated successfully");
        } catch (err) {
            return Responder.sendFailureMessage(res, "Something went wrong!");
        }
    };

}

module.exports = new UserController()