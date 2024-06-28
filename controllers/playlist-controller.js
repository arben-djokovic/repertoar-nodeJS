
const { ObjectId } = require("mongodb");
const Playlist = require("../models/Playlist")

const createPlaylist = async(req, res, next) => {
    try{
        const result = await Playlist.createPlaylist(req.body.name, req.body.tokenUserInfo.isAdmin, req.body.tokenUserInfo._id)
        res.json(result)
    }catch(err){
        next(err)
        return
    }
}

const addSongToPlaylist = async (req, res, next) => {
    try{
        const result = await Playlist.addSong(req.params.id, req.body.song_id, req.body.tokenUserInfo)
        res.json(result)
    }catch(err){
        next(err)
        return
    }
}

const getMinePlaylists = async (req, res, next) => {
    const searchQuery = req.query.search || "";
    try{
        const result = await Playlist.getMinePlaylists(req.body.tokenUserInfo._id, searchQuery)
        res.json(result)
    }catch(err){
        next(err)
        return
    }
}
const getPublicPlaylists = async(req, res, next) => {
    const searchQuery = req.query.search || "";
    try{
        const result = await Playlist.getPublicPlaylists(searchQuery)
        res.json(result)
    }catch(err){
        next(err)
        return
    }
}
const deletePlaylist = async(req, res, next) => {
    try{
        const result = await Playlist.deletePlaylistById(req.params.id, req.body.tokenUserInfo._id)
        res.json(result)
    }catch(err){
        next(err)
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
        next(err)
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
        next(err)
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
    getPlaylist
}