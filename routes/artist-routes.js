const express = require("express")
const Artist = require("../models/Artist")
const { adminRoute } = require("../middlewares/protected")
const app = express.Router()

app.post("/add", adminRoute, async(req, res, next) => {
    try{
        const newArtist = new Artist(req.body.name)
        const result = await newArtist.addArtist()
        res.json(result)
    }catch(err){
        next(err)
        return
    }
})
module.exports = app