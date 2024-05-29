const db = require("../data/database")
const { ObjectId } = require('mongodb');

class Song {
    constructor(title, artist_id, text, genre_id, id){
        this.title = title
        this.artist_id = artist_id
        this.text = text
        this.genre_id = genre_id 
        this.id = id
    }

    async addSong(){
        const result = await db.getDb().collection("song").insertOne({
            title: this.title,
            artist_id: new ObjectId(this.artist_id),
            text: this.text,
            genre_id: new ObjectId(this.genre_id)
        })
        return result
    }

    static async getAllSongs(){
        const result = await db.getDb().collection('song').aggregate([
            {
                $lookup: {
                    from: 'artist',
                    localField: 'artist_id',
                    foreignField: '_id',
                    as: 'artist'
                }
            },
            {
                $unwind: {
                    path: '$artist',
                    preserveNullAndEmptyArrays: true 
                }
            },
            {
                $lookup: {
                    from: 'genre',
                    localField: 'genre_id',
                    foreignField: '_id',
                    as: 'genre'
                }
            },
            {
                $addFields: {
                    artist: {
                        $ifNull: ['$artist', []] 
                    },
                    genre: {
                        $ifNull: ['$genre', []] 
                    }
                }
            }
        ]).toArray();
        return result
    } 
}

module.exports = Song