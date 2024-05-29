
const User = require("../models/User");

const login = async(req, res, next) => {
    const newUser = new User("test", "test", "test", false)
    try{
        const result = await newUser.login()
        res.json(result)
    }catch(err){
        next(err)
        return
    }
}


module.exports = {
    login
}