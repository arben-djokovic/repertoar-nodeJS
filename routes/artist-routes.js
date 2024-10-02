const express = require("express")
const { adminRoute, checkId } = require("../middlewares/middlewares")
const { addArtist, deleteArtist, editArtistName, getAllArtist, getArtist } = require("../controllers/artist-controller")

const app = express.Router()

app.get("/", adminRoute, getAllArtist)
app.post("/add", adminRoute, addArtist)
app.delete("/:id", adminRoute, checkId, deleteArtist)
app.put("/:id", adminRoute, checkId, editArtistName)
app.get("/:id", adminRoute, checkId, getArtist)
module.exports = app