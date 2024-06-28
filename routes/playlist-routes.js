const express = require("express")
const { createPlaylist, addSongToPlaylist, getPlaylist, getMinePlaylists, editPlaylist, getPublicPlaylists, deletePlaylist } = require("../controllers/playlist-controller")
const { verifyToken, checkId } = require("../middlewares/middlewares")
const app = express.Router()

app.post("/create", verifyToken,  createPlaylist)
app.patch("/add-song/:id", verifyToken, checkId, addSongToPlaylist)
app.patch("/:id", verifyToken, checkId, editPlaylist)
app.get("/get-mine", verifyToken, getMinePlaylists)
app.get("/", getPublicPlaylists)
app.get("/:id", getPlaylist)
app.delete("/:id",verifyToken, checkId, deletePlaylist)


module.exports = app