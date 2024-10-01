const { MongoClient, ServerApiVersion } = require('mongodb');

let database;

const mongodbUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/Repertoar';

const client = new MongoClient(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: { version: ServerApiVersion.v1 },
});

const connection = async () => {
  if (!database) {
    try {
      await client.connect();
      
      await client.db('admin').command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");

      database = client.db('Repertoar');
      console.log("Connected to MongoDB Atlas successfully.");
    } catch (err) {
      console.error("Failed to connect to MongoDB Atlas:", err);
      throw err;
    }
  }
};

const getDb = () => {
  if (!database) {
    throw new Error("Not connected to MongoDB!");
  }
  return database;
};

module.exports = {
  connection,
  getDb,
};
