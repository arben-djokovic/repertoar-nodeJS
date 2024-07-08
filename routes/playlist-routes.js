const express = require("express")
const { createPlaylist, removeSongFromPlaylist, addSongToPlaylist, getPlaylist, getMinePlaylists, editPlaylist, getPublicPlaylists, deletePlaylist } = require("../controllers/playlist-controller")
const { verifyToken, checkId } = require("../middlewares/middlewares")
const app = express.Router()

app.post("/create", verifyToken,  createPlaylist)
app.post("/add-song/:id", verifyToken, checkId, addSongToPlaylist)
app.patch("/:id", verifyToken, checkId, editPlaylist)
app.patch("/remove-song/:id", verifyToken, checkId, removeSongFromPlaylist)
app.get("/get-mine", verifyToken, getMinePlaylists)
app.get("/", getPublicPlaylists)
app.get("/:id", checkId, getPlaylist)
app.delete("/:id",verifyToken, checkId, deletePlaylist)


module.exports = app