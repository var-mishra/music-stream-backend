import express from 'express'
import { Router } from 'express'
import { Song } from '../models/song.model.js'
import isArtist from '../middleware/rolemiddle.js'
import {uploadSong,playSong,likeSong,dislike} from '../controllers/songController.js';
import authMidd from '../middleware/authmiddle.js';

const router=express.Router();

router.post('/upload',authMidd,isArtist,uploadSong)
router.post('/play/:id',authMidd,playSong)
router.post('/like/:id',authMidd,likeSong)
router.post('/dislike/:id',authMidd,dislike)


export default router;