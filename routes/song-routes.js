const express = require("express")
const { adminRoute, verifyToken, checkId } = require("../middlewares/middlewares")
const { addSong, getSongs, getSong, deleteSong } = require("../controllers/song-controller")
const app = express.Router()

app.post("/add", adminRoute, addSong)
app.get("/", getSongs)
app.get("/:id", checkId, getSong)
app.delete("/:id", checkId, adminRoute, deleteSong)


module.exports = app