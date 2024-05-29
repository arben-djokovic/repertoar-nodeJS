
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
    try{
        const result = await Playlist.addSong(req.params.playlistid, req.body.song_id)
        res.json(result)
    }catch(err){
        next(err)
        return
    }
}
module.exports = {
    createPlaylist,
    addSongToPlaylist
}