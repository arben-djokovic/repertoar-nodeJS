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
}

module.exports = Genre