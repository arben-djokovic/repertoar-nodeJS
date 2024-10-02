const { MongoClient } = require('mongodb');
let database;

let mongodbUrl = ''
if(process.env.MONGODB_URL){
    mongodbUrl = process.env.MONGODB_URL
}
const connection = async() => {
    try {
        const client = new MongoClient(process.env.MONGODB_URL);
        await client.connect();
        database = client.db('Repertoar');
    } catch(err) {
        console.log("Connection error", err);
        throw err;
    }
};

 
const getDb = () => {
    if(database){
        console.log("connected")
        return database
    }
    console.log("not connected")
    throw { message: "Not connected"}
}


module.exports ={
    connection,
    getDb
}