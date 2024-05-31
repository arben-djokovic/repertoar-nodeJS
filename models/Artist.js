const db = require("../data/database")
const { ObjectId } = require('mongodb');

class Artist {
    constructor(name, id){
        this.name = name
        this.id = id
    }
    static async getAllArtist(searchQuery){
        const matchQuery = {name: {$regex: searchQuery, $options: 'i' }}
        const result = await db.getDb().collection("artist").aggregate([{
            $match: matchQuery
        }]).toArray()
        return result
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
    static async updateName(artist_id, newName){
        if(!newName){
            return { message: "Nije unijeto ime"}
        }
        const result = await db.getDb().collection("artist").updateOne({_id: new ObjectId(artist_id)}, {$set: {name: newName}})
        if(result.modifiedCount == 0){
            return { message: "Izmjene nisu napravljene"}
        }
        return result
    }
}

module.exports = Artist