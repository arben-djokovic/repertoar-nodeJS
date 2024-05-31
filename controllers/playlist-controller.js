
const { ObjectId } = require("mongodb");
const Playlist = require("../models/Playlist")
const jwt = require("jsonwebtoken")

const createPlaylist = async(req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    const veryf = jwt.verify(bearerToken, process.env.SECRET_KEY)
    try{
        const result = await Playlist.createPlaylist(req.body.name, veryf.isAdmin, veryf._id)
        res.json(result)
    }catch(err){
        next(err)
        return
    }
}

const addSongToPlaylist = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    const veryf = jwt.verify(bearerToken, process.env.SECRET_KEY)
    try{
        const result = await Playlist.addSong(req.params.id, req.body.song_id, veryf)
        res.json(result)
    }catch(err){
        next(err)
        return
    }
}

const getMinePlaylists = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    const veryf = jwt.verify(bearerToken, process.env.SECRET_KEY)
    try{
        const result = await Playlist.getMinePlaylists(veryf._id)
        res.json(result)
    }catch(err){
        next(err)
        return
    }
}
const getPublicPlaylists = async(req, res, next) => {
    try{
        const result = await Playlist.getPublicPlaylists()
        res.json(result)
    }catch(err){
        next(err)
        return
    }
}
const deletePlaylist = async(req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    const veryf = jwt.verify(bearerToken, process.env.SECRET_KEY)
    try{
        const result = await Playlist.deletePlaylistById(req.params.id, veryf._id)
        res.json(result)
    }catch(err){
        next(err)
        return
    }
}
const editPlaylistName = async(req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid playlist ID' });
    }
    try{
        const result = await Playlist.changeName(req.params.id, req.body.newName)
        res.json(result)
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
    editPlaylistName
}