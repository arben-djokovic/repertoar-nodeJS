
const db = require("../data/database")
const { ObjectId } = require('mongodb');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
class User {
    constructor( username, password, id, isAdmin){
        this.username = username
        this.password = password 
        this.id = id
        this.isAdmin = isAdmin
    }
    async login(){
        let result = await db.getDb().collection("users").find({username: this.username}).toArray()
        result = result.find(el => bcrypt.compareSync(this.password, el.password))
        if(!result){
            return { message: 'Invalid username or password' };
        }
        const token = jwt.sign({_id: result._id, username: result.username, "isAdmin": result.isAdmin ? true : false}, process.env.SECRET_KEY, { expiresIn: '1h'})
        return {
            token: token
        }
    }
    async addUser(){
        const cryptedPassword = bcrypt.hashSync(this.password, 12)
        const findUser = await this.getByUsername(this.username)
        if(findUser[0]){
            return { msg: "User vec postoji"}
        }
        const result = await db.getDb().collection("users").insertOne({
            "username": this.username,
            "password": cryptedPassword,
            "isAdmin": this.isAdmin ? true : false
        })
        return result
    }

    async getByUsername(username){
        const result = await db.getDb().collection("users").find({username: username}).toArray()
        return result
    }
    static async getById(id){
        const result = await db.getDb().collection("users").find({_id: new ObjectId(id)}).toArray()
        return result[0]
    }
}
module.exports = User