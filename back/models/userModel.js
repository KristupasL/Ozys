const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const PostModel = require('./postModel.js')

let UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    photo: {
        type: String,
        required: false
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts'
    }],
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
})

UserSchema.pre('save', function(next) {
    let user = this
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(user.password, salt, (error, hash) => {
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

let UserModel = mongoose.model("Users", UserSchema)

module.exports = UserModel