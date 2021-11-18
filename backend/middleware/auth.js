const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => { 
    try {
        const session = sessionStorage.getItem('user');
        const token = session.token;
        const decodedToken = jwt.verify(token, 'SECRET_KEY');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID'
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        })
    }
}