const express = require('express')
const app = express()
const cors = require('cors')
const Config = require('./Helpers/Config')
const Utils = require('./Helpers/Utils')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
const MultiConnection = require('./Database/MultiConnection')
MultiConnection.createConnection()



app.listen(Config.PORT, () => console.log(`Server is running on ${Config.PORT} port`))