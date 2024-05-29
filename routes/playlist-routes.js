const express = require("express")
const { createPlaylist } = require("../controllers/playlist-controller")
const { verifyToken } = require("../middlewares/protected")
const app = express.Router()

app.post("/create", verifyToken,  createPlaylist)


module.exports = app