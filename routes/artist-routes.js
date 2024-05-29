const express = require("express")
const { adminRoute } = require("../middlewares/protected")
const { addArtist, deleteArtist } = require("../controllers/artist-controller")
const app = express.Router()

app.post("/add", adminRoute, addArtist)
app.delete("/:id", adminRoute, deleteArtist)
module.exports = app