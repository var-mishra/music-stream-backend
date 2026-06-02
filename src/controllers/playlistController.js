import express from 'express'
import { Playlist } from "../models/playlist.model.js";
import User  from '../models/user.model.js';
import { Song } from '../models/song.model.js';


export const createPlaylist=async (req,res)=>{
    try{
        const {title}=req.body;
    const playlist=await Playlist.create({
            title,
            user:req.user.id
    })
    res.status(201).json({
        message:"Playlist Created",
        playlist
    })
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}
export const addSongToPlaylist=async(req,res)=>{
    try{
        const {songId}=req.body
        const playlistId=req.params.id;

        const playlist=await Playlist.findById(playlistId)

        if(!playlist){
           return res.status(400).json({
                message:"Playlist not found"
            })
        }
        if(playlist.user.toString()!==req.user.id){
            return res.status(403).json({
                message:"Not authorized"
            })
        }
        const song =await Song.findById(songId);
        if(!song){
            return res.status(404).json({
                message:"Song not found"
            })
        }
        playlist.songs.addToSet(songId)
        await playlist.save();
        res.json({
            message:"Playlist Updated",
            playlist
        })

    }catch(err){
        console.log(err)
        res.status(500).json({
                message:err.message
        })
    }
}
export const removeSongFromPlaylist=async(req,res)=>{
    try{
         const {songId}=req.body.id;
    const playlistId=req.params.id;

    const playlist=Playlist.findById(playlistId)
    if(!playlist){
        return res.status(404).json({
            message:"Playlist no found"
        });
    }
    if(playlist.user.toString()!==req.user.id){
        return res.status(403).json({
            message:"Not Authorized"
        });
    }
    //remove song
    playlist.songs.pull(songId);

    await playlist.save();

    res.status(200).json({
        message:"Song removed from playlist",
        playlist
    });

    }catch(err){
        console.log(err)
        res.status(500).json({
            message:err.message
        })
    }
}

export const getUserPlaylist=async(req,res)=>{
    try{
        
const playlists = await Playlist.find({
    user: req.user.id,
    
}).populate({
    
 path: 'songs',
    populate: {
        path: 'artist',
        model: 'User',   // ✅ ADD THIS (VERY IMPORTANT)
        select: 'username'
    }

});
res.status(200).json({
    message: "Playlists fetched",
    playlists
});
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:err.message
        })
    }
}
