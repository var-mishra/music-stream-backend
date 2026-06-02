import mongoose from 'mongoose'

const songSchema=new mongoose.Schema({
    title:String,
    artist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }, 
    audioUrl: String,
    coverImage: String,
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    dislikes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
playCount: { type: Number, default: 0 }

}, { timestamps: true })

export const Song=mongoose.model("Song",songSchema)