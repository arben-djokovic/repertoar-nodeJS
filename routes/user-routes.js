const express = require("express")
const { login, singup, getUserById} = require("../controllers/user-controller")
const { verifyToken, adminRoute } = require("../middlewares/protected")

const app = express.Router()

app.post("/login", login)
app.post("/singup", singup)
app.get("/:id", verifyToken, getUserById)

module.exports = app