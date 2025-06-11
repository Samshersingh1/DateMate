 import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";   //this is schea of magoose...
import bcrypt from "bcrypt";  //this is for hashed passwords  
import dotenv from "dotenv";
dotenv.config();


 
 
 export  const signup= async (req,res) =>{                 // here signup detials are there 
      const {fullName,email,password}=req.body;   

       try{
           const existingUser=await User.findOne({email});  
           if(existingUser) {
                     return res.status(400).json({message:"User already exits"});
           } 

           const hashedPassword = await bcrypt.hash(password,10);  
           const newUser=new User({fullName,email,password:hashedPassword,});   
           
           // here one part i missed was at the time of signup it self we need to send user jwt token 
           if(newUser){ 
                await newUser.save();  
               generateToken(newUser._id,res); 
              // await newUser.save();  
               res.status(201).json({
                  _id: newUser._id,
                  fullName: newUser.fullName,
                  email: newUser.email,
                  profilePic: newUser.profilePic,
               });  
           }     
           else{
                res.status(400).json({message:"Invalid user data"});
           }  
      }    
       catch (err){ 
            console.error(err);
     res.status(500).json({message: "somthing is wrong in credentials:"});
      }  

};        
 
export  const login=async (req,res) =>{               //here login details are ...
        
}; 

export  const logout=(req,res) =>{     //here is logout feature implimented...
  res.cookie("jwt", "", { maxAge: 0 }); // clear cookie
  res.status(200).json({ message: "Logged out successfully" });
       
};      


  

