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
let PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: 'http://localhost:3000/', // replace with your frontend URL
    credentials: true,
  };
  
  app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/users', userRoutes);
app.use('/genres', genreRoutes);
app.use('/artists', artistRoutes);
app.use('/songs', songRoutes);
app.use('/playlists', playlistRoutes);

// Initialize the database connection before starting the server
db.connection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error("Failed to start the server:", err);
});


module.exports = app