

const userModel = require('../models/user')

const mongoose = require('mongoose')
const {ObjectId} = mongoose.Types


//to add a new user
const addUser = async(req , res)=>{
    try {


        const existingUser = await userModel.findOne({ email: req.body.email });
        if (existingUser) {
            console.log("already taken email")
            return res.status(400).json({ message: 'Email already exists' });
        }
        

        let newuserObj= new userModel({
            
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            cpassword:req.body.cpassword
    
        })
        newuserObj.save()
        res.send(newuserObj)
        
    } catch (error) {
        console.log("error from addUser")
    }
}



//to get all the users from db
const getUser = async(req,res)=>{
    try {
    
        const userDetails = await userModel.find()
        res.send(userDetails)

        
    } catch (error) {
        console.log("error from getUser")
    }
}


///to delete a single user
const deleteUser = async(req , res)=>{
    try {

        const userdata = await userModel.findByIdAndDelete(req.params.id)
        res.send(userdata)
        
    } catch (error) {
        console.log("error from deletuser",error)
    }
}


const searchuser =async(req,res)=>{
    try {

        const {query} =req.query
        const regex = new RegExp(query, 'i');
        const users = await userModel.find({
          $or: [
            { name: regex },
            { email: regex },
            { number: regex }
          ]
        });
        res.status(200).json(users);
        
    } catch (error) {
        
    }
}




module.exports={
    addUser,
    getUser,
    deleteUser,
    searchuser
}