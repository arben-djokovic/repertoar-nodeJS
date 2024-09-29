

const Song = require("../models/Song")


const addSong = async(req, res, next) => {
    try{
        const newSong = new Song(req.body.name, req.body.artist_id, req.body.text, req.body.genre_id)
        const result = await newSong.addSong()
        res.json(result)
    }catch(err){
        console.log({err: err})
        // res.sendStatus(500)
        return
    }
}

const getSongs = async(req, res, next) => {
    const searchQuery = req.query.search || "";
    const genreQuery = req.query.genre || "";
    try{
        const result = await Song.getAllSongs(searchQuery, genreQuery)
        res.json(result)
    }catch(err){
        console.log({err: err})
        return
    }
}
const getSong = async(req, res, next) => {
    try{
        const result = await Song.getSong(req.params.id)
        res.json(result)
    }catch(err){
        console.log({err: err})
        return
    }
}

const deleteSong = async(req, res, next) => {
    try{
        const result = await Song.deleteSong(req.params.id)
        res.json(result)
    }catch(err){
        console.log({err: err})
        return
    }
}
const editSong = async(req, res, next) => {
    const fieldsToUpdate = ['title', 'artist_id', 'text', 'genre_id'];
    const filteredUpdates = {};
    for (const key in req.body) {
        if (fieldsToUpdate.includes(key)) {
            filteredUpdates[key] = req.body[key];
        }
    }
    try{
        const result = await Song.editSong(req.params.id, filteredUpdates)
        res.json(result)
    }catch(err){
        res.status(500).json({message: "Doslo je do greske"})
        return
    }
}
const getRandomSong = async(req, res, next) => {
    try{
        const result = await Song.getRandomSong()
        res.json(result)
    }catch(err){
        res.status(500).json({message: "Doslo je do greske"})
        return
    }
}
module.exports = {
    addSong,
    getSongs,
    getSong,
    deleteSong,
    editSong,
    getRandomSong
}