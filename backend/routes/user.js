

const express = require("express")
const { newUser, login, uploadimage, updateuser, singleuser } = require("../controller/ruserController")

const userrouter = express.Router()



userrouter.post('/newUser', newUser)
userrouter.post('/userlogin', login)
userrouter.post('/upload', uploadimage)
userrouter.put('/updateuser/:id', updateuser)
userrouter.get('/user/:id', singleuser)




module.exports= userrouter