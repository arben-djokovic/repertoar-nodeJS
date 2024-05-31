
const Artist = require("../models/Artist")

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
module.exports = {
    addArtist,
    deleteArtist,
    editArtistName
}