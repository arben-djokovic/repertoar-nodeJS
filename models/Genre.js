const db = require("../data/database")

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
}

module.exports = Genre