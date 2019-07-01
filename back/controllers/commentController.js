const CommentModel = require("../models/commentModel.js")
const PostModel = require("../models/postModel.js")

let createComment = (req, res) => {
    let data = req.body
    let comment = new CommentModel()
    comment.comment = data.comment
    comment.creator = req.user._id
    comment.post = data.post


    comment.save()
        .then((item => {
            console.log(item._id)
            PostModel.findByIdAndUpdate({
                _id: data.post
            }, {
                $push: {
                    commentsOnPost: item._id
                }
            }, (e, b) => console.log(e, b))
            res.json(item)
        }))
        .catch(e => res.status(400).json(e))
}

module.exports = {
    createComment
}
