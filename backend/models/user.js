
const mongoose = require('mongoose')


const User = mongoose.model('user' , {
   
    name :{type:String},
    email:{type:String},
    password:{type:String},
    cpassword:{type:String},
    profileImg: {
        type: String,
        default: ''
    }
})


module.exports = User