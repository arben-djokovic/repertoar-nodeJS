const express = require("express")
const { createPlaylist, addSongToPlaylist, getMinePlaylists, editPlaylistName, getPublicPlaylists, deletePlaylist } = require("../controllers/playlist-controller")
const { verifyToken, checkId } = require("../middlewares/middlewares")
const app = express.Router()

app.post("/create", verifyToken,  createPlaylist)
app.patch("/add-song/:id", verifyToken, checkId, addSongToPlaylist)
app.patch("/:id", verifyToken, checkId, editPlaylistName)
app.get("/get-mine", verifyToken, getMinePlaylists)
app.get("/", getPublicPlaylists)
app.delete("/:id",verifyToken, checkId, deletePlaylist)


module.exports = app