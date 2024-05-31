const express = require("express")
const { adminRoute, checkId } = require("../middlewares/middlewares")
const { addGenre, deleteGenre, editGenre } = require("../controllers/genre-controller")
const app = express.Router()

app.post("/add", adminRoute, addGenre)
app.delete("/:id",adminRoute, checkId, deleteGenre)
app.patch("/:id",adminRoute, checkId, editGenre)
module.exports = app