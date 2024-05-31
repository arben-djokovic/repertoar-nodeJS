

const Song = require("../models/Song")


const addSong = async(req, res, next) => {
    try{
        const newSong = new Song(req.body.name, req.body.artist_id, req.body.text, req.body.genre_id)
        const result = await newSong.addSong()
        res.json(result)
    }catch(err){
        next(err)
        // res.sendStatus(500)
        return
    }
}

const getSongs = async(req, res, next) => {
    try{
        const result = await Song.getAllSongs()
        res.json(result)
    }catch(err){
        // res.sendStatus(500)
        next(err)
        return
    }
}
const getSong = async(req, res, next) => {
    try{
        const result = await Song.getSong(req.params.id)
        res.json(result)
    }catch(err){
        next(err)
        return
    }
}

const deleteSong = async(req, res, next) => {
    try{
        const result = await Song.deleteSong(req.params.id)
        res.json(result)
    }catch(err){
        next(err)
        return
    }
}
module.exports = {
    addSong,
    getSongs,
    getSong,
    deleteSong
}