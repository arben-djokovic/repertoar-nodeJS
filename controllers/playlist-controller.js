
const { ObjectId } = require("mongodb");
const Playlist = require("../models/Playlist")

const createPlaylist = async(req, res, next) => {
    try{
        const result = await Playlist.createPlaylist(req.body.name, req.body.tokenUserInfo.isAdmin, req.body.tokenUserInfo._id)
        res.json(result)
    }catch(err){
        res.status(500).json({message: "Doslo je do greske"})
        return
    }
}

const addSongToPlaylist = async (req, res, next) => {
    try{
        const result = await Playlist.addSong(req.params.id, req.body.song_id, req.body.tokenUserInfo)
        res.json(result)
    }catch(err){
        res.status(500).json({message: "Doslo je do greske"})
        return
    }
}

const getMinePlaylists = async (req, res, next) => {
    const searchQuery = req.query.search || "";
    try{
        const result = await Playlist.getMinePlaylists(req.body.tokenUserInfo._id, searchQuery)
        res.json(result)
    }catch(err){
        res.status(500).json({message: "Doslo je do greske"})
        return
    }
}
const getPublicPlaylists = async(req, res, next) => {
    const searchQuery = req.query.search || "";
    try{
        const result = await Playlist.getPublicPlaylists(searchQuery)
        res.json(result)
    }catch(err){
        res.status(500).json({message: "Doslo je do greske", err: err})
        return
    }
}
const deletePlaylist = async(req, res, next) => {
    try{
        const result = await Playlist.deletePlaylistById(req.params.id, req.body.tokenUserInfo._id)
        res.json(result)
    }catch(err){
        res.status(500).json({message: "Doslo je do greske"})
        return
    }
}
const editPlaylist = async(req, res, next) => {
    const fieldsToUpdate = ['name', 'user_id', 'isPublic'];
    const filteredUpdates = {};
    for (const key in req.body) {
        if (fieldsToUpdate.includes(key)) {
            filteredUpdates[key] = req.body[key];
        }
    }
    try{
        const result = await Playlist.updatePlaylist(req.params.id, filteredUpdates )
        res.json(result)
    }catch(err){
        res.status(500).json({message: "Doslo je do greske"})
        return
    }
}

const getPlaylist = async(req, res, next) => {
    try{
        const result = await Playlist.getPlaylist(req.params.id, req)
        if(result.length == 0){
            return res.status(401).json({message: "Playlista nije pronadjena"})
        }
        res.json(result[0])
    }catch(err){
        res.status(500).json({message: "Doslo je do greske"})
        return
    }
}
const removeSongFromPlaylist = async(req, res) => {
    try{
        const result = await Playlist.removeSong(req.params.id, req.body.song_id)
        res.json(result)
    }catch(err){
        res.status(500).json({message: "Doslo je do greske"})
        return
    }
}
const addToFavourites = async(req, res) => {
    try{
        const result = await Playlist.addToFavourites(req.params.id, req.body.tokenUserInfo._id)
        res.json(result)
    }catch(err){
        res.status(500).json({message: "Doslo je do greske"})
        return
    }
}
const removeFromFavourites = async(req, res) => {
    try{
        const result = await Playlist.removeFromFavourites(req.params.id, req.body.tokenUserInfo._id)
        res.json(result)
    }catch(err){
        res.status(500).json({message: "Doslo je do greske"})
        return
    }
}
const getMyFavourites = async(req, res) => {
    const searchQuery = req.query.search || "";
    try{
        const result = await Playlist.getMyFavourites(req.body.tokenUserInfo._id, searchQuery)
        res.json(result)
    }catch(err){
        res.status(500).json({message: "Doslo je do greske"})
        return
    }
}
module.exports = {
    createPlaylist,
    addSongToPlaylist,
    getMinePlaylists,
    deletePlaylist,
    getPublicPlaylists,
    editPlaylist,
    getPlaylist,
    removeSongFromPlaylist,
    addToFavourites,
    removeFromFavourites,
    getMyFavourites
}