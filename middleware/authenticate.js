// Require User model
const User = require('../models/user');

const authenticate = (req, res, next) => {
    let token = req.header('x-auth');
    if (token === 'ASimpleStringForNow') {
        req.token = token;
        next();
    } else {
        console.log(`Access Denied -- Token is Invalid!`)
    }
}

module.exports = authenticate;