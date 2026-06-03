import express from 'express';
import mongoose from 'mongoose';

// ✅ IMPORTANT: register all models
import './models/user.model.js';
import './models/song.model.js';
import './models/playlist.model.js';

import authroutes from './routes/authroutes.js';
import songRoutes from './routes/songRoutes.js';
import playlistroutes from './routes/playlistroutes.js';
import authMidd from './middleware/authmiddle.js';
import artistroutes from './routes/artistroutes.js'

const app = express();
app.use(express.json());

// test route
app.get("/", (req, res) => {
    res.send("Backend is live");
});

// routes
app.use("/api/auth", authroutes);
app.use("/api/songs", songRoutes);
app.use("/api/playlists", playlistroutes);
app.use("/api/artists",artistroutes)
export default app;