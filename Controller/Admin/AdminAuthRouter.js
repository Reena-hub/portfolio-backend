const app = require('express')()
const AdminValidation = require('./AdminValidation')
const AdminController = require('./AdminController')
const Middleware = require('../../Helpers/Middleware')

app.use('/signin', AdminValidation.signin(), Middleware.checkError, AdminController.signin)

module.exports = app