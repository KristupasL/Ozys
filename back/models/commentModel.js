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

<<<<<<< HEAD
=======
  },
  likes: [{
    like: {
      type: String,
      required: true
      // required: true


>>>>>>> a07f3d14b94748f9235665b60619d24e2f45d3e8
    },
    likes: {
        type: Number,
        required: true
    }

})
let CommentModel = mongoose.model("CommentsItems", CommentSchema)


module.exports = CommentModel