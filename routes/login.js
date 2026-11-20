import User from "../model/User.js";
import express from 'express'

const route = express.Router()
route.post('/post/register', async (req,res) =>{
    try{
        //this checks if an email is in the database 
        const userEmail = await User.findOne({ email: req.body.email });
        if (userEmail) {

            console.log('This email is taken')
            //respond sends data to server
            return res.status(400).json({ error: "email already exists" })
        }
        const newUser = await User.create(req.body)
        res.status(200).json(newUser)
 
    }
    catch(error){
        console.error("Failed to create user", error)
        res.status(400).json({error: "could not create new user", details: error.message})
    }
})

 
// const correctPw = await user.isCorrectPassword(req.body.password);
 
// if (!correctPw) {
//   return res.status(400).json({ message: "Incorrect email or password" });
// }
export default route;