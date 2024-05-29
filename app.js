const express = require("express")
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./data/database') 
const  userRoutes = require("./routes/user-routes")
const  genreRoutes = require("./routes/genre-routes")
require('dotenv').config();

const app = express()

let PORT = 3000
if(process.env.PORT){
    PORT = process.env.PORT
}


app.use(express.urlencoded({extended: false}))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/user', userRoutes)
app.use('/genre', genreRoutes)

db.connection().then(() => {
    app.listen(PORT)
})