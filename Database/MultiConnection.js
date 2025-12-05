const mongoose = require('mongoose')
const Config = require('../Helpers/Config')

function MultiConnection() {
    this.createConnection = () => {
        mongoose.set("strictQuery", false);
        mongoose.connect(Config.DB_URL, { serverSelectionTimeoutMS: 10000 }).then(() => {
            console.log("DB Connected")
        }).catch(err => {
            console.log(err)
        })
    }
}

module.exports = new MultiConnection()