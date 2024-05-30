const express = require("express")
const { adminRoute, verifyToken } = require("../middlewares/protected")
const { addSong, getSongs, getSong } = require("../controllers/song-controller")
const app = express.Router()

app.post("/add", adminRoute, addSong)
app.get("/", adminRoute, getSongs)
app.get("/:songid", verifyToken, getSong)


module.exports = app