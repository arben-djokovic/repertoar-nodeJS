const express = require("express")
const { adminRoute, checkId } = require("../middlewares/middlewares")
const { addGenre, deleteGenre, getGenre, editGenre, getAllGenres } = require("../controllers/genre-controller")
const app = express.Router()

app.get("/", getAllGenres)
app.post("/add", adminRoute, addGenre)
app.delete("/:id",adminRoute, checkId, deleteGenre)
app.patch("/:id",adminRoute, checkId, editGenre)
app.get("/:id",checkId, getGenre)
module.exports = app