
const Genre = require("../models/Genre")

const addGenre = async(req, res, next) => {
    try{
        const newGenre = new Genre(req.body.name)
        const result = await newGenre.addGenre()
        res.json(result)
    }catch(err){
        next(err)
        return
    }
}

const deleteGenre = async(req, res, next) => {
    try{
        const newGenre = new Genre(undefined, req.params.id)
        const result = await newGenre.deleteGenre()
        res.json(result)
    }catch(err){
        next(err)
        return
    }
}
const editGenre = async(req, res, next) => {
    try{
        const result = await Genre.updateGenre(req.params.id, req.body.newName)
        res.json(result)
    }catch(err){
        next(err)
        return
    }
}
module.exports = {
    addGenre,
    deleteGenre,
    editGenre
}