const express = require("express")
const { adminRoute } = require("../middlewares/protected")
const { addSong, getSongs } = require("../controllers/song-controller")
const app = express.Router()

app.post("/add", adminRoute, addSong)
app.get("/", adminRoute, getSongs)


module.exports = app