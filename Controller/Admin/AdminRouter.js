const app = require('express')()
const AdminValidation = require('./AdminValidation')
const AdminController = require('./AdminController')

app.post('/logout', AdminController.logout)

app.use('/user', "../User/UserRouter.js")

module.exports = app