const { MongoClient } = require('mongodb');

let client = null; // Store the MongoDB client
let database = null; // Store the connected database instance

const connection = async () => {
  // If the database connection exists, reuse it
  if (database) {
    return database;
  }

  // If client connection is not already created, connect to MongoDB
  if (!client) {
    try {
      client = new MongoClient(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await client.connect();
      console.log("MongoDB connected successfully");
    } catch (err) {
      console.log("MongoDB connection error:", err);
      throw err;
    }
  }

  // Set and return the database instance
  database = client.db('Repertoar');
  return database;
};

// This function will return the connected database instance
const getDb = async () => {
  if (!database) {
    // Ensure the database is connected before getting the DB instance
    await connection();
  }
  return database;
};

module.exports = {
  connection,
  getDb,
};
