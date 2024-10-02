const express = require("express")
const { createPlaylist, removeSongFromPlaylist, getMyFavourites, removeFromFavourites, addToFavourites, addSongToPlaylist, getPlaylist, getMinePlaylists, editPlaylist, getPublicPlaylists, deletePlaylist } = require("../controllers/playlist-controller")
const { verifyToken, checkId } = require("../middlewares/middlewares")
const app = express.Router()

app.get("/my-favourites", verifyToken, getMyFavourites)
app.post("/create", verifyToken,  createPlaylist)
app.post("/add-song/:id", verifyToken, checkId, addSongToPlaylist)
app.put("/:id", verifyToken, checkId, editPlaylist)
app.put("/remove-song/:id", verifyToken, checkId, removeSongFromPlaylist)
app.get("/get-mine", verifyToken, getMinePlaylists)
app.get("/", getPublicPlaylists)
app.get("/:id", checkId, getPlaylist)
app.delete("/:id",verifyToken, checkId, deletePlaylist)
app.post("/add-to-favourites/:id",verifyToken, checkId, addToFavourites)
app.post("/remove-from-favourites/:id", verifyToken, checkId, removeFromFavourites)


module.exports = app