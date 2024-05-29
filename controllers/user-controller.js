
const User = require("../models/User");

const login = async(req, res, next) => {
    const newUser = new User(req.body.username, req.body.password)
    try{
        const result = await newUser.login()
        res.json(result)
    }catch(err){
        next(err)
        return
    }
}
const singup = async(req, res, next) => {
    const newUser = new User(req.body.username, req.body.password)
    try{
        const result = await newUser.addUser()
        res.json(result)
    }catch(err){
        next(err)
        return
    }
}
const getUserById = async(req, res, next) => {
    try{
        const result = await User.getById(req.params.id)
        res.json(result)
    }catch(err){
        next(err)
        return
    }
}

module.exports = {
    login,
    singup,
    getUserById
}