

const express = require("express")

const router = express.Router()


const {addUser, getUser, deleteUser, searchuser} = require('../controller/usercontroller')
const mongotype = require('mongoose').Types



///post api facility

router.post('/adduser',addUser)
router.get('/getuser',getUser)
router.delete('/deleteUser/:id', deleteUser)
router.get('/searchuser', searchuser)


module.exports = router