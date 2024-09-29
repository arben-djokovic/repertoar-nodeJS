const express = require("express")
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./data/database') 
const  userRoutes = require("./routes/user-routes")
const  genreRoutes = require("./routes/genre-routes")
const  artistRoutes = require("./routes/artist-routes")
const  songRoutes = require("./routes/song-routes")
const  playlistRoutes = require("./routes/playlist-routes")
require('dotenv').config();
const cors = require('cors');

const app = express()

let PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use('/users', userRoutes)
app.use('/genres', genreRoutes)
app.use('/artists', artistRoutes)
app.use('/songs', songRoutes)
app.use('/playlists', playlistRoutes)

db.connection().then(() => {
    app.listen(PORT)
})
.catch((err) => {
  console.error('Failed to connect to the database:', err);
});


module.exports = app;
