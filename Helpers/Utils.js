const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const Config = require('./Config');
cloudinary.config({
    cloud_name: Config?.CLOUDINARY?.CLOUD_NAME,
    api_key: Config?.CLOUDINARY?.API_KEY,
    api_secret: Config?.CLOUDINARY?.API_SECRET,
})

function Utils() {
    this.uploadFiles = async (file) => {
        try {
            const uploadPromise = new Promise((result, reject) => {
                let cld_upload_stream = cloudinary.uploader.upload_stream({ folder: file?.folderName, public_id: file?.fileName, resource_type: file?.type }, (error, value) => {
                    if (error) {
                        return result({ err: true, msg: error })
                    } else {
                        return result({ err: false, url: value.secure_url })
                    }
                });
                return streamifier.createReadStream(file?.source).pipe(cld_upload_stream);
            })
            return await uploadPromise
        } catch (error) {
            console.log(error)
            return { err: true, msg: "Something went wrong!" }
        }
    };
}

module.exports = new Utils();
