const express = require("express")
const { adminRoute, verifyToken, checkId } = require("../middlewares/middlewares")
const { addSong, getSongs, getRandomSong, getSong, deleteSong, editSong } = require("../controllers/song-controller")
const app = express.Router()

app.post("/add", adminRoute, addSong)
app.get("/", getSongs)
app.get("/random", getRandomSong)
app.get("/:id", checkId, getSong)
app.delete("/:id", checkId, adminRoute, deleteSong)
app.put("/:id", checkId, adminRoute, editSong)


module.exports = app