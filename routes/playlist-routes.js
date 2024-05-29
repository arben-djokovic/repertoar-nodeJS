const express = require("express")
const { createPlaylist, addSongToPlaylist } = require("../controllers/playlist-controller")
const { verifyToken } = require("../middlewares/protected")
const app = express.Router()

app.post("/create", verifyToken,  createPlaylist)
app.patch("/add-song/:playlistid", verifyToken, addSongToPlaylist)


module.exports = app