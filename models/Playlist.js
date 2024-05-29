const db = require("../data/database")


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

}

module.exports = Playlist