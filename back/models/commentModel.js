const mongoose = require('mongoose');

let CommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
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
        required: true
    }

})
let CommentModel = mongoose.model("CommentsItems", CommentSchema)


module.exports = CommentModel