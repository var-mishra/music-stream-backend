import express from 'express'
import { Song } from '../models/song.model.js'
import User from '../models/user.model.js'


export const uploadSong=async(req,res)=>{

    const {title,audioUrl,coverImage}=req.body;
    console.log("REQ.User",req.user)
    const song=await Song.create({
        title,
        audioUrl,
        coverImage,
        artist: req.user.id
    })
    res.status(201).json({
        mesaage:"Song Uploaded Successfully",
        data:song
    })
}

export const playSong=async(req,res)=>{

    try{
        const song=await Song.findByIdAndUpdate(
        req.params.id,
        {$inc:{playCount:1}},
        {new:true}
    )
    if(!song){
        res.status(404).json({
            message:"Song not found"
        })
    }
    res.status(200).json({
        message:"Song played",
        playCount:song.playCount
    })
    }
    catch(err){       
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}

export const likeSong=async(req,res)=>{
    const songId=req.params.id;
    const userId=req.user.id;

    const song=await Song.findById(songId)
    if(!song){
        res.status(404).json({
            message:"Song Not Found"
        })
    }
    if(!song.likes.includes(userId)){
        song.likes.includes(userId);

        song.dislikes.pull(userId);
    }

    await song.save();
    // ✅ Add to user's likedSong

    const user=await User.findById(userId)
    user.likedSongs.addToSet(songId)
    await user.save();
    res.json({
        message:"Song liked",
        song:song.title,
        Url:song.audioUrl


    })
}
export const dislike=async(req,res)=>{
    const userId=req.user.id;
    const songId=req.params.id;
    const user=await User.findById(userId)
    const song=await Song.findById(songId)
    if(!song){
        return res.status(404).json({
            message:"Song not found"
        })
    }
    if(!song.dislikes.includes(userId)){
        song.dislikes.push(userId);
        song.likes.pull(userId);
    }

    await song.save();
    user.likedSongs.pull(songId)
    await user.save();
    res.json({
        message:"Song disliked",
        user
    })
}