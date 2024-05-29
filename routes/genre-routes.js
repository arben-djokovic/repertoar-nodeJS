const express = require("express")
const { adminRoute } = require("../middlewares/protected")
const { addGenre, deleteGenre } = require("../controllers/genre-controller")
const app = express.Router()

app.post("/add", adminRoute, addGenre)
app.delete("/:id", deleteGenre)
module.exports = app