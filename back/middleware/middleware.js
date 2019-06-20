const jwt = require('jsonwebtoken')
const {
    superSec
} = require('../config/config')
const User = require('../models/userModel')

let authenticate = (req, res, next) => {
    let token = req.header('x-auth')
    let decoded;
    try {
        decoded = jwt.verify(token, superSec)
        User.findOne({
            _id: decoded._id,
            "tokens.access": "auth",
            "tokens.token": token
        }).then((user) => {
            if (user) {
                req.user = user
                req.token = token
                next()
            } else {
                res.status(401).json("You are not authorized")
            }
        })
    } catch (e) {
        res.status(400).json(e)
    }

}

module.exports = {
    authenticate
}