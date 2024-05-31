const express = require("express")
const { login, singup, getUserById} = require("../controllers/user-controller")
const { verifyToken, adminRoute, checkId } = require("../middlewares/middlewares")

const app = express.Router()

app.post("/login", login)
app.post("/singup", singup)
app.get("/:id", verifyToken, checkId, getUserById)

module.exports = app