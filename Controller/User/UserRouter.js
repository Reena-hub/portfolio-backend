const app = require('express')()
const UserController = require('./UserController')
const UserValidation = require('./UserValidation')
const Middleware = require('../../Helpers/Middleware')
const multer = require('multer')
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
});
const fileUploads = upload.fields([{ name: 'resume', maxCount: 1 }])

app.post('/create', fileUploads, UserValidation.create(), Middleware.checkError, UserController.create)

app.patch('/update/:userId', fileUploads, UserValidation.update(), Middleware.checkError, UserController.update)

app.patch('/update/skill/:userId', fileUploads, UserValidation.skillUpdate(), Middleware.checkError, UserController.skillUpdate)

app.patch('/update/education/:userId', fileUploads, UserValidation.educationUpdate(), Middleware.checkError, UserController.educationUpdate)


module.exports = app;