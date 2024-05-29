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
            user_id: user_id
        })
        return result
    }


    static async addSong(playlist_id, song_id){
        const playlistObjectId = new ObjectId(playlist_id);
        const songObjectId = new ObjectId(song_id);

        const result2 = await db.getDb().collection("playlist").find({
            _id: playlistObjectId,
            songIds: { $in: [songObjectId] }
        }).toArray()
        if(result2[0]){
            return {message: "Pjesma se vec nalazi u playlisti"}
        }

        const result = await db.getDb().collection('playlist').updateOne(
            { _id: playlistObjectId },
            { $push: { songIds: songObjectId } }
        );
        return result
    }




}

module.exports = Playlist