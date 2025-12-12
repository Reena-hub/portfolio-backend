const Responder = require('./Responder')
const User = require('../Database/User')
const jwt = require("jsonwebtoken");

function Middleware() {
    this.checkUser = async (req, res, next) => {
        let token = req?.headers?.authorization?.split(" ")[1];
        if (token) {
            return jwt.verify(token, Config?.ACCESS_TOKEN, async (err, decode) => {
                if (decode) {
                    const checkUser = await User.findOne({ token: decode?.iss }, { "_id": 0, "__v": 0 }).lean()
                    if (checkUser) {
                        req['ourUserId'] = checkUser?.userId;
                        return next()
                    } else {
                        return Responder.sendFailureMessage(res, "Unauthorized Access", 401);
                    }
                } else {
                    return Responder.sendFailureMessage(res, "Unauthorized Access", 401);
                }
            })
        } else {
            return Responder.sendFailureMessage(res, "Unauthorized Access", 401);
        }
    }
    this.checkError = (req, res, next) => {
        let hasErrors = validationResult(req);
        if (!hasErrors.isEmpty()) {
            return Responder.sendFailureMessage(res, "" + hasErrors.errors[0].msg);
        } else {
            return next()
        }
    };
}

module.exports = new Middleware()