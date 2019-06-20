const mongoose = require('mongoose')


let PostSchema = new mongoose.Schema({
    photo: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    likesCount: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: false
    },
    commentsCount: {
        type: Number,
        required: false
    },
    date: {
        type: Date,
        required: false
    }
})

let PostModel = mongoose.model('Posts', PostSchema)

module.exports = PostModel