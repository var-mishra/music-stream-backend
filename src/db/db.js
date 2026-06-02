import express from 'express'
import mongoose from 'mongoose'

const connectDb= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database Connected Successfully")
    }
    catch(error){
        console.log(error)
        console.log("db is not connected")
    }
}
export default connectDb;