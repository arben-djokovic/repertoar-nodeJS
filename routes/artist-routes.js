const express = require("express")
const { adminRoute, checkId } = require("../middlewares/middlewares")
const { addArtist, deleteArtist, editArtistName, getAllArtist } = require("../controllers/artist-controller")

const app = express.Router()

app.get("/", adminRoute, getAllArtist)
app.post("/add", adminRoute, addArtist)
app.delete("/:id", adminRoute, checkId, deleteArtist)
app.patch("/:id", adminRoute, checkId, editArtistName)
module.exports = app