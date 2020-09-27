const jwt = require('jsonwebtoken')

module.exports = function(req,res,next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send({error: true, code: 401, message: 'Access Denied'})
    try {
        req.user = jwt.verify(token, process.env.TOKEN_SECRET);
        next();
    }catch (e) {
        res.status(400).send({error: true, code: 400, message: 'Invalid Token'})
    }
}