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
        const result = await db.getDb().collection("songs").insertOne({
            title: this.title,
            artist_id: this.artist_id && new ObjectId(this.artist_id),
            text: this.text,
            genre_id: this.genre_id && new ObjectId(this.genre_id) 
        })
        return result
    }

    static async getAllSongs(searchQuery, genreQuery){
        const matchQuery = {
            $or: [
                { title: { $regex: searchQuery, $options: 'i' } }, 
                { text: { $regex: searchQuery, $options: 'i' } }, 
                { 'artist.name': { $regex: searchQuery, $options: 'i' } }
            ]
        };
        if (genreQuery.length > 0) {
            matchQuery['genre_id'] = new ObjectId(genreQuery);
        }
        
        const result = await db.getDb().collection('songs').aggregate([
            {
                $lookup: {
                    from: 'artists',
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
                    from: 'genres',
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
            },
            {
                $match: matchQuery
            }
        ]).toArray();
        return result
    } 

    static async getSong(songid){
        const songidObjectId = new ObjectId(songid);
    
        const result = await db.getDb().collection("songs").aggregate([
            { $match: { _id: songidObjectId } },
            {
                $lookup: {
                    from: "artists",
                    localField: "artist_id",
                    foreignField: "_id",
                    as: "artist"
                }
            },
            {
                $lookup: {
                    from: "genres",
                    localField: "genre_id",
                    foreignField: "_id",
                    as: "genre"
                }
            },
            { $unwind: { path: "$artist", preserveNullAndEmptyArrays: true } },
            { $unwind: { path: "$genre", preserveNullAndEmptyArrays: true } }
        ]).toArray();
        
        return result[0];
    }

    static async deleteSong(songid){
        const songidObjectId= new ObjectId(songid);
        const result = await db.getDb().collection("songs").deleteOne({_id: songidObjectId})
        return result
    }

    static async editSong(id, updates){
        if(!updates){
            return {message: "Niste unijeli podatke za edit"}
        }
        if(updates.artist_id){
            updates.artist_id = new ObjectId(updates.artist_id)
        }
        if(updates.genre_id){
            updates.genre_id = new ObjectId(updates.genre_id)
        }
        const result = await db.getDb().collection("songs").updateOne({_id: new ObjectId(id)}, {$set: updates})
        if(result.modifiedCount == 0){
            return {message: "Pjesma nije izmijenjena"}
        } 
        return result
    }
    static async getRandomSong() {
        const result = await db.getDb().collection("songs").aggregate([
            { $sample: { size: 1 } },
            {
                $lookup: {
                    from: "artists",
                    localField: "artist_id",
                    foreignField: "_id",
                    as: "artist"
                }
            },
            {
                $lookup: {
                    from: "genres",
                    localField: "genre_id",
                    foreignField: "_id",
                    as: "genre"
                }
            },
            { $unwind: { path: "$artist", preserveNullAndEmptyArrays: true } },
            { $unwind: { path: "$genre", preserveNullAndEmptyArrays: true } }
        ]).toArray();
        
        return result[0];
    }
}

module.exports = Song