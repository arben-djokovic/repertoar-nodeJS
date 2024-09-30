const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./data/database');
const userRoutes = require("./routes/user-routes");
const genreRoutes = require("./routes/genre-routes");
const artistRoutes = require("./routes/artist-routes");
const songRoutes = require("./routes/song-routes");
const playlistRoutes = require("./routes/playlist-routes");
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Define allowed origins
const allowedOrigins = [
  'https://repertoarcg.netlify.app',
  'http://localhost:3000'
];

// Enable CORS with the specified options
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin); // Allow origin
    } else {
      callback(new Error('Not allowed by CORS')); // Block origin
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'], // Include OPTIONS
  credentials: true // Allow credentials (cookies, authorization headers)
}));

// Middleware setup
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies

// Define routes
app.use('/users', userRoutes);
app.use('/genres', genreRoutes);
app.use('/artists', artistRoutes);
app.use('/songs', songRoutes);
app.use('/playlists', playlistRoutes);

// Initialize the database connection before starting the server
db.connection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("Failed to start the server:", err);
  });

module.exports = app; // Export the app for testing or other uses
