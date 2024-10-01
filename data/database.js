const { MongoClient, ServerApiVersion } = require('mongodb');

let database;

// Use the MongoDB URL from environment variables, fallback to local for development
const mongodbUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/Repertoar';

// Initialize the MongoClient with options, including Stable API version
const client = new MongoClient(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: { version: ServerApiVersion.v1 }, // Ensures backward compatibility with MongoDB 5.0+
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

// Return the database instance if it's connected
const getDb = async() => {
  if (!database) {
    await connection()
  }
  return database;
};

module.exports = {
  connection,
  getDb,
};
