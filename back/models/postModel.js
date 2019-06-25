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
        default: 0
    },
    title: {
        type: String,
        required: false
    },
    commentsCount: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: new Date()
    }
})

let PostModel = mongoose.model('Posts', PostSchema)

module.exports = PostModel