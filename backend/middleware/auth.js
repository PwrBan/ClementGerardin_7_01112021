const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => { 
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'SECRET_KEY');
        const userId = decodedToken.userId;
        const isAdmin = decodedToken.admin;
        if (req.body.userId && req.body.userId !== userId || isAdmin === 0) {
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