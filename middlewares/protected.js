
const jwt = require("jsonwebtoken")

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        try{
            const veryf = jwt.verify(bearerToken, process.env.SECRET_KEY)
            console.log(veryf)
            next();
        }catch(err){
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired' });
            } else {
                return res.status(403).json({ message: 'Token is invalid' });
            }
        }
    } else {
        res.sendStatus(403);
    }
}
function adminRoute(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        try{
            const veryf = jwt.verify(bearerToken, process.env.SECRET_KEY)
            if(veryf.isAdmin == true){

                next();
            }else{
                return res.status(401).json({ message: 'Admin route' });
            }
        }catch(err){
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired' });
            } else {
                return res.status(403).json({ message: 'Token is invalid' });
            }
        }
    } else {
        res.sendStatus(403);
    }
}
module.exports = {
    verifyToken,
    adminRoute
}