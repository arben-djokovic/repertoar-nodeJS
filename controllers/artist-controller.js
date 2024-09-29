
const Artist = require("../models/Artist")

const getAllArtist = async(req, res, next) => {
    const searchQuery = req.query.search || ""
    try{
        const result = await Artist.getAllArtist(searchQuery)
        res.json(result)
    }catch(err){
        res.status(500).json({message: "Doslo je do greske"})
        return
    }
}
const addArtist = async(req, res, next) => {
    try{
        const newArtist = new Artist(req.body.name)
        const result = await newArtist.addArtist()
        res.json(result)
    }catch(err){
        next(err)
        return
    }
}
const deleteArtist = async(req, res, next) => {
    try{
        const newArtist = new Artist(undefined, req.params.id)
        const result = await newArtist.deleteArtist()
        res.json(result)
    }catch(err){
        next(err)
        return
    }
}
const editArtistName = async(req, res, next) => {
    try{
        const result = await Artist.updateName(req.params.id, req.body.newName)
        res.json(result)
    }catch(err){
        next(err)
        return
    }
}

const getArtist = async(req, res) => {
    try{
        const result = await Artist.getArtist(req.params.id)
        res.json(result)
    }catch(err){
        next(err)
        return
    }
}
module.exports = {
    addArtist,
    deleteArtist,
    editArtistName,
    getAllArtist,
    getArtist
}