require('dotenv').config({ quiet: true });
const env = process.env

module.exports = {
    DB_URL: env.DB_URL,
    PORT: env.PORT,
    CLOUDINARY: {
        CLOUD_NAME: env.CLOUD_NAME,
        API_KEY: env.API_KEY,
        API_SECRET: env.API_SECRET
    }
}