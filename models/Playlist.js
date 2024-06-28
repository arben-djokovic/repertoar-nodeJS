const db = require("../data/database")
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken')

class Playlist{
    constructor(name, user_id, isPublic, songIds){
        this.name = name
        this.user_id = user_id
        this.isPublic = isPublic
        this.songIds = songIds
    }

    static async createPlaylist(name, isPublic, user_id){
        const result = await db.getDb().collection("playlist").insertOne({
            name: name,
            isPublic: isPublic,
            user_id: new ObjectId(user_id),
            songIds: []
        })
        return result
    }

    static async getPlaylist(id, req){
        let or = [{isPublic: true}]
        const bearerHeader = req.headers['authorization'];

        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            try{
                const veryf = jwt.verify(bearerToken, process.env.SECRET_KEY)
                or.push({ user_id: new ObjectId(veryf._id) });
                console.log(veryf)
            }catch(err){
                console.log(err)
            }
        }
        const result = await db.getDb().collection("playlist").aggregate([
            {
                $match: {
                    _id: new ObjectId(id),
                    $or: or
                }
            }
        ]).toArray()
        return result
    }

    static async addSong(playlist_id, song_id, userInfo){
        const playlistObjectId = new ObjectId(playlist_id);
        const songObjectId = new ObjectId(song_id);
        const userIdObjectId = new ObjectId(userInfo._id);

        const result2 = await db.getDb().collection("playlist").find({
            _id: playlistObjectId,
            songIds: { $in: [songObjectId] }
        }).toArray()

        if(result2[0]){
            return {message: "Pjesma se vec nalazi u playlisti"}
        }
        else if(userInfo.isAdmin){
            const result = await db.getDb().collection('playlist').updateOne(
                { $and: [ {_id: playlistObjectId}, {isPublic: true} ]},
                { $push: { songIds: songObjectId } }
            );
            return result
        }else{
            const result = await db.getDb().collection('playlist').updateOne(
                { 
                    $and: [
                        { _id: playlistObjectId },
                        { user_id: userIdObjectId }
                    ]
                },
                { $push: { songIds: songObjectId } }
            );
            return result
        }
    }

    static async getMinePlaylists (user_id, searchQuery){
        const userIdObjectId = new ObjectId(user_id);
        const matchQuery = { name: { $regex: searchQuery, $options: 'i' }, user_id: userIdObjectId };
        const result = await db.getDb().collection("playlist").aggregate([
            {
                $match: matchQuery
            },
            {
                $lookup: {
                    from: "song",
                    localField: "songIds",
                    foreignField: "_id",
                    as: "songs"
                }
            },
            {
                $addFields: {
                    songs: "$songs" 
                }
            }
        ]).toArray();
        return result
    }

    static async getPublicPlaylists (searchQuery){
        const matchQuery = { name: { $regex: searchQuery, $options: 'i' }, isPublic: true };
        const result = await db.getDb().collection("playlist").aggregate([
            {
                $match: matchQuery
            },
            {
                $lookup: {
                    from: "song",
                    localField: "songIds",
                    foreignField: "_id",
                    as: "songs"
                }
            },
            {
                $addFields: {
                    songs: "$songs" 
                }
            }
        ]).toArray();
        return result
    }

    static async deletePlaylistById(playlistid, user_id){
        const result = await db.getDb().collection("playlist").deleteOne({_id: new ObjectId(playlistid), user_id: new ObjectId(user_id)})
        if(result.deletedCount == 0){
            return {
                message: "Playlista nije izbrisana"
            }
        }
        return result
    }
    static async updatePlaylist(id, updates){
        if(!updates){
            return {message: "Niste unijeli podatke za edit"}
        }
        const result = await db.getDb().collection("playlist").updateOne({_id: new ObjectId(id)}, {$set: updates})
        if(result.modifiedCount == 0){
            return {message: "Playlista nije izmijenjena"}
        } 
        return result
    }
}

module.exports = Playlist