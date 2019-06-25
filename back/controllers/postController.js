const PostModel = require("../models/postModel.js")

let createPost = (req, res) => {
    let data = req.body
    let post = new PostModel()
    post.photo = data.photo
    post.creator = req.user._id
    post.title = data.title


    post.save()
        .then((item => {
            res.json(item)
        }))
        .catch(e => res.status(400).json(e))
}

module.exports = {
    createPost
}