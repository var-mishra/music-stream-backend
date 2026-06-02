import express from 'express'
import jwt from 'jsonwebtoken'

const authMidd=async(req,res,next)=>{
    try {
        let token=req.headers.authorization;
        
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        
if (token.startsWith('Bearer ')) {
            token = token.split(' ')[1];
        }
console.log(token)
    const decoded=jwt.verify(token,"SECRET_KEY");
    
    req.user = decoded; // { id, role }
    next();

    }
        
catch (err) {
    console.log(err)
    res.status(401).json({ message: err });
}

    }
export default authMidd;