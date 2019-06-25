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

let like = (req, res) => {
    let id = req.param('id')
    PostModel.update({
            _id: id,
            likesList: {
                $ne: req.user._id
            }
        }, {
            $inc: {
                likesCount: 1
            },
            $push: {
                likesList: req.user._id
            }
        })
        .then(response => {
            res.json(response)
        })
        .catch(e => res.json(e))
}

let unlike = (req, res) => {
    let id = req.param('id')
    PostModel.update({
            _id: id,
            likesList: req.user._id
        }, {
            $inc: {
                likesCount: -1
            },
            $pull: {
                likesList: req.user._id
            }
        })
        .then(response => {
            res.json(response)
        })
        .catch(e => res.status(400).json(e))
}

module.exports = {
    createPost,
    like,
    unlike
}