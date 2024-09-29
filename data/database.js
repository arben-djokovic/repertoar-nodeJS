const { MongoClient } = require('mongodb');
let database;

let mongodbUrl = 'mongodb://0.0.0.0:27017'
if(process.env.MONGODB_URL){
    mongodbUrl = process.env.MONGODB_URL
}
const connection = async() => {
    try {
        const client = new MongoClient(mongodbUrl);
        await client.connect();
        database = client.db('repertoar');
    } catch(err) {
        console.log(err);
        throw err;
    }
};

 
const getDb = () => {
    if(database){
        console.log("connected")
        console.log(mongodbUrl)
        return database
    }
    console.log("not connected")
    throw { message: "Not connected"}
}


module.exports ={
    connection,
    getDb
}