import {Song} from '../models/song.model.js' 
import User from '../models/user.model.js'
export const getArtistStats=async (req,res)=>{
   try{
     const artistId=req.user.id;
    const songs=await Song.find({artist:artistId})

    const totalSongs=songs.length;

    const totalPlays=songs.reduce((sum,song)=>{
        return sum+song.playCount;
    },0)
    
 // ✅ calculate total likes
        const totalLikes = songs.reduce((sum, song) => {
            return sum + song.likes.length;
        }, 0);

        res.status(200).json({
            success:true,
            totalSongs,
            totalPlays,
            totalLikes
        })

   }catch(err){
    return res.status(500).json({
        message:err.message
    })
   }
}