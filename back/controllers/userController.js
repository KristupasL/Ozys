const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
    superSec
} = require("../config/config");

//Register function for UserModel
let register = (req, res) => {
    let data = req.body;
    let user = new User();
    user.userName = data.userName;
    user.email = data.email;
    user.password = data.password;
    user
        .save()
        .then(item => {
            res.json(item);
        })
        .catch(e => res.status(400).json(e));
};

//Login function for userModel
let login = (req, res) => {
    let data = req.body;
    User.findOne({
            userName: data.userName
        })
        .then(user => {
            if (!user) {
                res.json("No user with this username");
                return;
            }
            bcrypt.compare(data.password, user.password, (err, response) => {
                if (response) {
                    let access = "auth";
                    let token = jwt
                        .sign({
                                _id: user._id.toHexString(),
                                access
                            },
                            superSec
                        )
                        .toString();
                    user.tokens.push({
                        access,
                        token
                    });
                    user.save().then(useris => {
                        res.header("x-auth", token).json(useris);
                    });
                } else {
                    res.json("incorrect password");
                }
            });
        })
        .catch(e => res.status(400).json(e));
};

let logout = (req, res) => {
    let user = req.user;
    let token = req.token;
    user
        .update({
            $pull: {
                tokens: {
                    token
                }
            }
        })
        .then(() => {
            res.json("logged out");
        })
        .catch(e => res.status(400).json(e));
};

module.exports = {
    register,
    login,
    logout
};
