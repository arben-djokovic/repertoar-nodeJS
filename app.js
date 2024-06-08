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

let PORT = 3000
if(process.env.PORT){
    PORT = process.env.PORT
}

app.use(cors({
    origin: 'http://localhost:3001' 
  }));
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/user', userRoutes)
app.use('/genre', genreRoutes)
app.use('/artist', artistRoutes)
app.use('/song', songRoutes)
app.use('/playlist', playlistRoutes)

db.connection().then(() => {
    app.listen(PORT)
})