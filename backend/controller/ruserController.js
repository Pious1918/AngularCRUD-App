const userModel = require('../models/user')

const mongoose = require('mongoose')



const jwt = require("jsonwebtoken")

require('dotenv').config()
const jwtsecretkey = process.env.JWT_SECRET_KEY;
const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary').v2


//function to generate token
const generateToken = (payload , secretkey , expiresIn)=>{
    return jwt.sign(payload , secretkey , {expiresIn})

}

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})





///register the new User

const newUser = async(req,res)=>{
 
    try {


        const existingUser = await userModel.findOne({ email: req.body.email });
        if (existingUser) {
            console.log("already taken email")
            return res.status(400).json({ message: 'Email already exists' });
        }

        const newUser = new userModel({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            cpassword:req.body.cpassword
        })

       await newUser.save()
        res.send(newUser)

        
    } catch (error) {
        console.log("Error from newUser")
    }
}



//Login the registered user
const login =async(req,res)=>{
    try {

        const {email , password } =req.body
        console.log("reassc",email,password)
        const loginCredentials = await userModel.findOne({ email });

        console.log("found user",loginCredentials)
        if(!loginCredentials){
            console.log("No such user")
            return res.status(404).send({message:'User not found'})
            
        }

        if(loginCredentials.password===password){
            console.log("User is valid")

            const token = generateToken({ userId : loginCredentials._id ,email : loginCredentials.email },
                jwtsecretkey,
                '1h'
            )

      
            // res.cookie('token', token, { httpOnly: true, secure: true }); // Add secure: true in production

            res.status(200).send({ message: 'Login successful', token, userData: loginCredentials });
        }else{
            console.log("Invalid password")
            res.send({message : 'Invalid password'})
        }

        
    } catch (error) {
        console.log("Error from login in rusercontroller")
    }
}



///uploadimage

const uploadimage=async(req,res)=>{
    try {
      const file=req.files.image
      const userId = req.query.userid; // Access the user ID from the query parameter
        console.log("fileris ",file)

    //   console.log(file)
        console.log('reaced jere',userId)
        
        const currentuser = await userModel.findById(userId)
        console.log("current user is : ", currentuser)

       const result= await cloudinary.uploader.upload(file.tempFilePath , (err, result)=>{
            console.log("result",result)
        })
    
            console.log("result",result.secure_url)

            const secureurl = result.secure_url

            currentuser.profileImg=secureurl
            await currentuser.save();
            console.log("image added");
        res.status(200).json({ message: "Image uploaded successfully", url: secureurl }); // Send success response with URL

    } catch (error) {
        console.log("error from uploadimage")
    }
}



const updateuser = async(req, res)=>{
    try {

        const id = req.params.id

        if (!id) {
            return res.status(400).json({ error: 'User ID is missing' });
          }


        console.log("dfsdsda",id)
        const { name, password, cpassword } = req.body;

        if (name || password || cpassword) {
            // Construct an object with the fields to update
            const updatedFields = {};
      
            if (name) {
              updatedFields.name = name;
            }
            if (password) {
              updatedFields.password = password;
            }
            if (cpassword) {
              updatedFields.cpassword = cpassword;
            }
      
            // Find the user by ID and update the fields
            const updatedUser = await userModel.findByIdAndUpdate(id, updatedFields, { new: true });
      
            // Return the updated user data
            res.status(200).json({ message: 'User data updated successfully', user: updatedUser });
          } else {
            // No fields provided for update
            res.status(400).json({ error: 'No fields provided for update' });
          }

        
    } catch (error) {
        
        console.log("error from userupdate",error)
    }
}



const singleuser = async(req,res)=>{

    try {

        const userId = req.params.id;


        const userdata = await userModel.findById(userId)
        res.json(userdata);

        
    } catch (error) {
        console.log("error from single user")
    }
}



module.exports={
    newUser,
    login,
    uploadimage,
    updateuser,
    singleuser
}