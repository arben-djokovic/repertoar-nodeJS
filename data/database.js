const { MongoClient } = require('mongodb');

let database;

// Use the MongoDB URL from environment variables, fallback to local for development
const mongodbUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/Repertoar';

// Initialize the MongoClient with options for MongoDB Atlas
const client = new MongoClient(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: '1',
});

const connection = async () => {
  if (!database) {
    try {
      // Connect the client
      await client.connect();
      // Get the database instance
      database = client.db('Repertoar');
      console.log("Connected to MongoDB Atlas successfully.");
    } catch (err) {
      console.error("Failed to connect to MongoDB Atlas:", err);
      throw err;
    }
  }
};

// Return the database instance if it is connected
const getDb = () => {
  if (!database) {
    throw { message: "Not connected to MongoDB!" };
  }
  return database;
};

module.exports = {
  connection,
  getDb,
};
