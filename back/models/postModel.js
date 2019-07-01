const mongoose = require('mongoose')
const UserModel = require('./userModel.js')
const CommentsModel = require('./commentModel.js')


let PostSchema = new mongoose.Schema({
    photo: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    likesCount: {
        type: Number,
        default: 0
    },
    likesList: {
        type: Array,
        default: []
    },
    title: {
        type: String,
        required: false
    },
    commentsOnPost: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments'
    }],
    commentsCount: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: () => new Date()
    }
})

let PostModel = mongoose.model('Posts', PostSchema)

module.exports = PostModel