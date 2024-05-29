const db = require("../data/database")

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
}

module.exports = Artist