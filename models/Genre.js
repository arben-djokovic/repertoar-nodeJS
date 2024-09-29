const db = require("../data/database")
const { ObjectId } = require('mongodb');

class Genre {
    constructor(name, id){
        this.name = name
        this.id = id
    }
    static async getAllGenres(searchQuery){
        const matchQuery = {name: {$regex: searchQuery, $options: 'i' }}
        const result = await db.getDb().collection("genres").aggregate([{
            $match: matchQuery
        }]).toArray()
        return result
    }

    async addGenre(){
        const result = await db.getDb().collection("genres").insertOne({
            name: this.name
        })
        return result
    }
    async deleteGenre(){
        const genreId = new ObjectId(this.id)
        const result = await db.getDb().collection("genres").deleteOne({
           _id: genreId
        })
        return result
    }
    static async updateGenre(genre_id, newName){
        if(!newName){
            return {message: "Novo ime nije unijeto"}
        }
        const result = await db.getDb().collection("genres").updateOne({_id: new ObjectId(genre_id)}, {$set: {name: newName}})
        if(result.modifiedCount == 0){
            return {message: "Genre nije izmijenjen"}
        }
        return result
    }
    static async getGenre(genre_id){
        const result = await db.getDb().collection("genres").findOne({_id: new ObjectId(genre_id)})
        return result
    }
}

module.exports = Genre