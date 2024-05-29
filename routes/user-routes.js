const express = require("express")
const { login } = require("../controllers/user-controller")

const app = express.Router()

app.get("/login", login)
app.get("/singup", login)

module.exports = app