const db = require("../data/database")
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken')

class Playlist{
    constructor(name, user_id, isPublic, songIds){
        this.name = name
        this.user_id = user_id
        this.isPublic = isPublic
        this.songIds = songIds
    }

    static async createPlaylist(name, isPublic, user_id){
        const result = await db.getDb().collection("playlists").insertOne({
            name: name,
            isPublic: isPublic,
            user_id: new ObjectId(user_id),
            songIds: []
        })
        return result
    }

    static async getPlaylist(id, req) {
        let or = [{ isPublic: true }];
        const bearerHeader = req.headers['authorization'];
      
        if (typeof bearerHeader !== 'undefined') {
          const bearer = bearerHeader.split(' ');
          const bearerToken = bearer[1];
          try {
            const verified = jwt.verify(bearerToken, process.env.SECRET_KEY);
            or.push({ user_id: new ObjectId(verified._id) });
          } catch (err) {
            console.log(err);
          }
        }
      
        const result = await db.getDb().collection("playlists").aggregate([
          {
            $match: {
              _id: new ObjectId(id),
              $or: or
            }
          },
          {
            $lookup: {
              from: "songs",
              localField: "songIds",
              foreignField: "_id",
              as: "songs"
            }
          },
          {
            $unwind: {
              path: "$songs",
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $lookup: {
              from: "artists",
              localField: "songs.artist_id",
              foreignField: "_id",
              as: "songs.artist"
            }
          },
          {
            $unwind: {
              path: "$songs.artist",
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $lookup: {
              from: "genres",
              localField: "songs.genre_id",
              foreignField: "_id",
              as: "songs.genre"
            }
          },
          {
            $unwind: {
              path: "$songs.genre",
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $addFields: {
              "songs.artist": {
                $ifNull: ["$songs.artist", { name: "undefined" }]
              },
              "songs.genre": {
                $ifNull: ["$songs.genre", { name: "undefined" }]
              }
            }
          },
          {
            $group: {
              _id: "$_id",
              name: { $first: "$name" },
              isPublic: { $first: "$isPublic" },
              user_id: { $first: "$user_id" },
              songIds: { $first: "$songIds" },
              songs: { $push: "$songs" }
            }
          }
        ]).toArray();
      
        return result;
      }
      

    static async addSong(playlist_id, song_id, userInfo){
        const playlistObjectId = new ObjectId(playlist_id);
        const songObjectId = new ObjectId(song_id);
        const userIdObjectId = new ObjectId(userInfo._id);

        const result2 = await db.getDb().collection("playlists").find({
            _id: playlistObjectId,
            songIds: { $in: [songObjectId] }
        }).toArray()

        if(result2[0]){
            return {message: "Pjesma se vec nalazi u playlisti"}
        }
        else if(userInfo.isAdmin){
            const result = await db.getDb().collection('playlists').updateOne(
                { $and: [ {_id: playlistObjectId}, {isPublic: true} ]},
                { $push: { songIds: songObjectId } }
            );
            return result
        }else{
            const result = await db.getDb().collection('playlists').updateOne(
                { 
                    $and: [
                        { _id: playlistObjectId },
                        { user_id: userIdObjectId }
                    ]
                },
                { $push: { songIds: songObjectId } }
            );
            return result
        }
    }

    static async getMinePlaylists (user_id, searchQuery){
        const userIdObjectId = new ObjectId(user_id);
        const matchQuery = { name: { $regex: searchQuery, $options: 'i' }, user_id: userIdObjectId };
        const result = await db.getDb().collection("playlists").aggregate([
            {
                $match: matchQuery
            },
            {
                $lookup: {
                    from: "songs",
                    localField: "songIds",
                    foreignField: "_id",
                    as: "songs"
                }
            },
            {
                $addFields: {
                    songs: "$songs" 
                }
            }
        ]).toArray();
        return result
    }

    static async getPublicPlaylists (searchQuery){
        const matchQuery = { name: { $regex: searchQuery, $options: 'i' }, isPublic: true };
        const result = await db.getDb().collection("playlists").aggregate([
            {
                $match: matchQuery
            },
            {
                $lookup: {
                    from: "songs",
                    localField: "songIds",
                    foreignField: "_id",
                    as: "songs"
                }
            },
            {
                $addFields: {
                    songs: "$songs" 
                }
            }
        ]).toArray();
        return result
    }

    static async deletePlaylistById(playlistid, user_id){
        const result = await db.getDb().collection("playlists").deleteOne({_id: new ObjectId(playlistid), user_id: new ObjectId(user_id)})
        if(result.deletedCount == 0){
            return {
                message: "Playlista nije izbrisana"
            }
        }
        return result
    }
    static async updatePlaylist(id, updates){
        if(!updates){
            return {message: "Niste unijeli podatke za edit"}
        }
        const result = await db.getDb().collection("playlists").updateOne({_id: new ObjectId(id)}, {$set: updates})
        if(result.modifiedCount == 0){
            return {message: "Playlista nije izmijenjena"}
        } 
        return result
    }
    
    static async removeSong (playlist_id, song_id){
        const playlistObjectId = new ObjectId(playlist_id);
        const songObjectId = new ObjectId(song_id);
        const result = await db.getDb().collection('playlists').updateOne(
            { _id: playlistObjectId },
            { $pull: { songIds: songObjectId } }
        );
        return result
    }

    static async addToFavourites (playlist_id, user_id){
        const playlistObjectId = new ObjectId(playlist_id);
        const userIdObjectId = new ObjectId(user_id);
        const result = await db.getDb().collection('users').updateOne(
            { _id: userIdObjectId },
            { $push: { favourites: playlistObjectId } }
        );
        return result
    }

    static async removeFromFavourites (playlist_id, user_id){
        const playlistObjectId = new ObjectId(playlist_id);
        const userIdObjectId = new ObjectId(user_id);
        const result = await db.getDb().collection('users').updateOne(
            { _id: userIdObjectId },
            { $pull: { favourites: playlistObjectId } }
        );
        return result
    }

    static async getMyFavourites(user_id, searchQuery){
        const userIdObjectId = new ObjectId(user_id);
        const result = await db.getDb().collection('users').aggregate([
            { $match: { _id: userIdObjectId } },
            {
                $lookup: {
                    from: "playlists",
                    localField: "favourites",
                    foreignField: "_id",
                    as: "playlists"
                }
            },
            {
                $addFields: {
                    playlists: "$playlists" 
                }
            }
        ]).toArray();
        return result
    }
}

module.exports = Playlist