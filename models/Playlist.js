const db = require("../data/database")
const { ObjectId } = require('mongodb');


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

    static async getMinePlaylists (user_id){
        const userIdObjectId = new ObjectId(user_id);
        const result = await db.getDb().collection("playlist").aggregate([
            {
                $match: { user_id: userIdObjectId } 
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

    static async getPublicPlaylists (){
        const result = await db.getDb().collection("playlist").aggregate([
            {
                $match: { isPublic: true } 
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
}

module.exports = Playlist