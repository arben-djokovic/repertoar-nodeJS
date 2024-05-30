const express = require("express")
const { adminRoute, verifyToken } = require("../middlewares/protected")
const { addSong, getSongs, getSong, deleteSong } = require("../controllers/song-controller")
const app = express.Router()

app.post("/add", adminRoute, addSong)
app.get("/", getSongs)
app.get("/:songid", getSong)
app.delete("/:songid", adminRoute, deleteSong)


module.exports = app