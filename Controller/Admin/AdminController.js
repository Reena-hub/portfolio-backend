const User = require("../../Database/User")
const Responder = require("../../Helpers/Responder")
const Utils = require("../../Helpers/Utils")
const uniqid = require('uniqid');

function AdminController() {
    this.signin = async (req, res) => {
        try {
            const { username, password } = req.body
            const checkUser = await User.findOne({ email: username }, { "_id": 0, "__v": 0 }).lean()
            if (checkUser) {
                if (checkUser?.password === Utils.createHashPwd(password)) {
                    const unique = uniqid()
                    const token = Utils?.generateAuthToken(unique, new Date())
                    if (token?.success) {
                        await User.updateOne({ userId: checkUser.userId }, { token: unique })
                        return Responder?.sendSuccessData(res, "Login Successfull", { token: token?.token })
                    } else {
                        return Responder?.sendFailureMessage(res, "Unable to login")
                    }
                } else {
                    return Responder?.sendFailureMessage(res, "Incorrect Password")
                }
            } else {
                return Responder?.sendFailureMessage(res, "User not found")
            }
        } catch (err) {
            return Responder?.sendFailureMessage(res, "Something went wrong!")
        }
    }
    this.logout = async (req, res) => {
        try {
            const updateToken = await User.updateOne({ userId: req?.ourUserId }, { token: "" })
            if (updateToken?.modifiedCount) {
                return Responder?.sendSuccessMessage(res, "Logout Successfull")
            } else {
                return Responder?.sendFailureMessage(res, "Unable to logout")
            }
        } catch (err) {
            return Responder?.sendFailureMessage(res, "Something went wrong!")
        }
    }
}

module.exports = new AdminController()