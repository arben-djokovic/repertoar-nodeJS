
const Genre = require("../models/Genre")

const addGenre = async(req, res, next) => {
    try{
        const newGenre = new Genre(req.body.name)
        const result = await newGenre.addGenre()
        res.json(result)
    }catch(err){
        res.status(500).json({message: "Doslo je do greske", err: err})
        return
    }
}

const deleteGenre = async(req, res, next) => {
    try{
        const newGenre = new Genre(undefined, req.params.id)
        const result = await newGenre.deleteGenre()
        res.json(result)
    }catch(err){
        res.status(500).json({message: "Doslo je do greske", err: err})
        return
    }
}
const editGenre = async(req, res, next) => {
    try{
        const result = await Genre.updateGenre(req.params.id, req.body.newName)
        res.json(result)
    }catch(err){
        res.status(500).json({message: "Doslo je do greske", err: err})
        return
    }
}
const  getAllGenres = async(req, res, next) => {
    const searchQuery = req.query.search || ""
    try{
        const result = await Genre.getAllGenres(searchQuery)
        res.json(result)
    }catch(err){
        res.status(500).json({message: "Doslo je do greske", err: err})
        return
    }
}
const getGenre = async(req, res) => {
    try{
        const result = await Genre.getGenre(req.params.id)
        res.json(result)
    }catch(err){
        res.status(500).json({message: "Doslo je do greske", err: err})
        return
    }
}
module.exports = {
    addGenre,
    deleteGenre,
    editGenre,
    getAllGenres,
    getGenre
}