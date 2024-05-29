
const db = require("../data/database")

class User {
    constructor( username, password, id, isAdmin){
        this.username = username
        this.password = password // hashed password
        this.id = id
        this.isAdmin = isAdmin
    }
    async login(){
        let result = await db.getDb().collection("user").find({username: this.username}).toArray()
        result = result.find(el => el.password == this.password)
        if(!result){
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        return {
            user: result
        }
    }
    async addUser(){
        const result = await db.getDb().collection("user").insertOne({
            "username": this.username,
            "password": this.password,
            "isAdmin": this.isAdmin
        })
        console.log(result)
    }
}
module.exports = User