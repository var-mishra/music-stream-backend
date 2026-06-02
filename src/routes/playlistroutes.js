import express from 'express';
import {
    addSongToPlaylist,
    createPlaylist,
    getUserPlaylist,
    removeSongFromPlaylist
} from '../controllers/playlistController.js';

import authMidd from '../middleware/authmiddle.js';

const router = express.Router();

// ✅ create
router.post('/', authMidd, createPlaylist);

// ✅ add song
router.post('/:id/add', authMidd, addSongToPlaylist);

// ✅ remove song
router.post('/:id/remove', authMidd, removeSongFromPlaylist);

// ✅ get playlists
router.get('/', authMidd, getUserPlaylist);

export default router;