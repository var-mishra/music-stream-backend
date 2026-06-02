import express from 'express'
import  app from './src/app.js'
import connectDb from './src/db/db.js'
import dotenv from 'dotenv'
dotenv.config()
// connecting database
const PORT=process.env.PORT
connectDb();
app.listen(PORT||3000,()=>{
    console.log(`server is running on port 3000 http://localhost:${PORT}`)
})