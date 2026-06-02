import express from 'express'
import {Router} from 'express'
import authMidd from '../middleware/authmiddle.js'
import isArtist from '../middleware/rolemiddle.js'
import  { getArtistStats } from '../controllers/artistController.js'
const router=express.Router()

router.post('/stat',authMidd,isArtist,getArtistStats)

export default router;