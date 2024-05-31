const db = require("../data/database")
const { ObjectId } = require('mongodb');

class Genre {
    constructor(name, id){
        this.name = name
        this.id = id
    }

    async addGenre(){
        const result = await db.getDb().collection("genre").insertOne({
            name: this.name
        })
        return result
    }
    async deleteGenre(){
        const genreId = new ObjectId(this.id)
        const result = await db.getDb().collection("genre").deleteOne({
           _id: genreId
        })
        return result
    }
    static async updateGenre(genre_id, newName){
        if(!newName){
            return {message: "Novo ime nije unijeto"}
        }
        const result = await db.getDb().collection("genre").updateOne({_id: new ObjectId(genre_id)}, {$set: {name: newName}})
        if(result.modifiedCount == 0){
            return {message: "Genre ne postoji"}
        }
        return result
    }
}

module.exports = Genre