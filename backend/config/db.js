
const mongoose = require("mongoose")

const {MONGO_URL} = process.env

exports.connect =()=>{
    mongoose.connect(MONGO_URL , {
        useNewUrlParser:true,
        useUnifiedTopology: true
    })
    .then(()=>{
        console.log("connection is successful")
    })
    .catch((error)=>{
        console.log("There is error",error)
    })
}