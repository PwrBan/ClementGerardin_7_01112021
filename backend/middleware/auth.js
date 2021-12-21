const jwt = require('jsonwebtoken');
const fs = require('fs');
const tokenKey = fs.readFileSync('./environment/private-token.key')

module.exports = (req, res, next) => { 
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, tokenKey);
        const userId = decodedToken.userId;
        const isAdmin = decodedToken.admin;
        if (req.body.userId && req.body.userId !== userId) {
            if(isAdmin === 1){
                next();
            }
            throw "invalid userId";
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        })
    }
}