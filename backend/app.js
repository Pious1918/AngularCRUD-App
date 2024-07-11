

require('dotenv').config()

require('./config/db').connect()

const express = require("express")
const cors = require('cors')
const bodyparser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary').v2



app.use(bodyparser.json());
app.use(cors({origin: 'http://localhost:4200'}))


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})



app.use(fileUpload({
    useTempFiles:true,
    // limits:{fileSize: 2 * 1024 * 1024 }
}))




const adminRoutes= require('./routes/admin')

const userRoutes = require('./routes/user')




app.use('',userRoutes)

app.use('/admin',adminRoutes)


module.exports = app