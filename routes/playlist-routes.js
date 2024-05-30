const express = require("express")
const { createPlaylist, addSongToPlaylist, getMinePlaylists, getPublicPlaylists } = require("../controllers/playlist-controller")
const { verifyToken } = require("../middlewares/protected")
const app = express.Router()

app.post("/create", verifyToken,  createPlaylist)
app.patch("/add-song/:playlistid", verifyToken, addSongToPlaylist)
app.get("/get-mine", verifyToken, getMinePlaylists)
app.get("/", getPublicPlaylists)


module.exports = app