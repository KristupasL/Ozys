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

let likeOn = (postId, userId) => {
    PostModel.update({
        _id: postId,
        likesList: {
            $ne: userId
        }
    }, {
        $inc: {
            likesCount: 1
        },
        $push: {
            likesList: userId
        }
    })
}

let likeOff = (postId, userId) => {
    PostModel.update({
        _id: postId,
        likesList: userId
    }, {
        $inc: {
            likesCount: -1
        },
        $pull: {
            likesList: userId
        }
    })
}

let like = (req, res) => {
    let id = req.param('id')

    PostModel
        .findOne({
            _id: id
        }, {
            likesList: {
                $elemMatch: {
                    $eq: req.user._id
                }
            }
        })
        .then(item => {
            if (item.likesList.length) {
                likeOff(id, req.user._id)
                res.json(true)
            } else {
                likeOn(id, req.user._id)
                res.json(false)
            }

        })
        .catch(e => res.status(400).json(e))

}

module.exports = {
    createPost,
    like
}