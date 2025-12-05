const express = require('express')
const app = express()
const cors = require('cors')
const Config = require('./Helpers/Config')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
const MultiConnection = require('./Database/MultiConnection')
MultiConnection.createConnection()

const multer = require('multer')
const Utils = require('./Helpers/Utils')
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
});
const fileUploads = upload.fields([{ name: 'resume', maxCount: 1 }])

app.post("/resume", fileUploads, async (req, res) => {
    let pdf = req?.files?.resume ? await Utils.uploadFiles({
        fileName: "resume",
        folderName: `CUST0001/`,
        source: req?.files?.resume[0]?.buffer,
        type: "raw"
    }) : { err: true };
    console.log(pdf, "pdf")
})

app.listen(Config.PORT, () => console.log(`Server is running on ${Config.PORT} port`))