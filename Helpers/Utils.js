const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const crypto = require("crypto");
const Config = require('./Config');
const jwt = require("jsonwebtoken");
cloudinary.config({
    cloud_name: Config?.CLOUDINARY?.CLOUD_NAME,
    api_key: Config?.CLOUDINARY?.API_KEY,
    api_secret: Config?.CLOUDINARY?.API_SECRET,
})

function Utils() {
    // Cloudinary
    this.uploadFiles = async (file) => {
        try {
            const uploadPromise = new Promise((result, reject) => {
                let cld_upload_stream = cloudinary.uploader.upload_stream({ folder: file?.folderName, public_id: file?.fileName, resource_type: file?.type }, (error, value) => {
                    if (error) {
                        return result({ success: false, msg: error })
                    } else {
                        return result({ success: true, url: value.secure_url })
                    }
                });
                return streamifier.createReadStream(file?.source).pipe(cld_upload_stream);
            })
            return await uploadPromise
        } catch (error) {
            return { success: false, msg: "Something went wrong!" }
        }
    };
    // Password
    this.createHashPwd = (input) => {
        return crypto.createHash("md5").update(input).digest("hex");
    };
    // Token
    this.generateAuthToken = function (userId, time) {
        try {
            let token = jwt?.sign(
                {
                    iss: userId?.toString(),
                    time: time?.toString(),
                },
                Config?.ACCESS_TOKEN
            );
            return { success: true, token: token };
        } catch (error) {
            return { msg: "Something went wrong!", success: false }
        }
    };
}

module.exports = new Utils();
