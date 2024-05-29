const db = require("../data/database")
const { ObjectId } = require('mongodb');

class Artist {
    constructor(name, id){
        this.name = name
        this.id = id
    }

    async addArtist(){
        const result = await db.getDb().collection("artist").insertOne({
            name: this.name
        })
        return result
    }

    async deleteArtist(){
        const artistId = new ObjectId(this.id)
        const result = await db.getDb().collection("artist").deleteOne({
           _id: artistId
        })
        return result
    }
}

module.exports = Artist