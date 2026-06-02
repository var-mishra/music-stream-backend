import express from 'express'
import mongoose from 'mongoose'
import User  from '../models/user.model.js'
import app from '../app.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const register= async(req,res)=>{
    const {username, email, password,role}=req.body
    
    const IsusernameExist=await User.findOne({username});
    if(IsusernameExist){
        return res.status(401).json({
            message:"Username already exist",
            username
        })
    }
    const hashedpassword=await bcrypt.hash(password,10);
    const user= await User.create({
        username,
        email,
        password:hashedpassword,
        role
    })
    res.status(201).json({
        message:"Registration Successful",
        data:user
    })
}

const login=async(req,res)=>{
        const {username,email,password}=req.body;
        const user=await User.findOne({username});
        if(!user){
            return res.status(401).json({
                message:"User does not exist"
            })
        }
       
        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(404).json({
                message:"Invalid Credentials"
            })
        }
        
 // ✅ generate token
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            "process.env.JWT_SECRET",
            { expiresIn: "1d" }
        );
        
        res.status(200).json({

            message:"login successfull",
            user,token
        })
}
export {register,login};
