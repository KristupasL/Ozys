const mongoose = require('mongoose');

let CommentSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: true

  },
  post: {
    type: String,
    required: true

  },
  comment:{
    type: String,
    required: true

  },
  likes: [{
    like: {
      type: String,
      required: true
    },
    user: {
      type: String,
      required: true
    }
  }]

})
let CommentModel = mongoose.model("CommentsItems", CommentSchema)


module.exports = CommentModel
