const mongoose = require('mongoose');
const UserModel = require('./userModel.js')

let CommentSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: false
    },
    date: {
        type: String,
        default: () => {
            let a = new Date()
            let b = a.getTime()
            return b;
        }
    }
})
let CommentModel = mongoose.model("Comments", CommentSchema)


module.exports = CommentModel