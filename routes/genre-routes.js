const express = require("express")
const Genre = require("../models/Genre")
const { adminRoute } = require("../middlewares/protected")
const app = express.Router()

app.post("/add", adminRoute, async(req, res, next) => {
    try{
        const newGenre = new Genre(req.body.name)
        const result = await newGenre.addGenre()
        res.json(result)
    }catch(err){
        next(err)
        return
    }
})
module.exports = app