const PostModel = require("../models/postModel.js")

let feedLoad = (req, res) => {
    PostModel
        .find({}, {
            photo: 1,
            creator: 1,
            likesCount: 1,
            commentsCount: 1,
            date: 1,
            title: 1,
            commentsOnPost: 1,
            likesList: {
                $elemMatch: {
                    $eq: req.user._id
                }
            }
        })
        .limit(10)
        .sort({
            date: 'desc'
        })
        .populate('creator', 'userName photo')
        .populate({
            path: 'commentsOnPost',
            model: 'Comments',
            options: {
                limit: 3,
                sort: {
                    date: 'desc'
                }
            },
            populate: {
                path: 'creator',
                model: 'Users',
                select: 'userName photo'
            }
        })
        .then(items => {
            res.json(items);
        })
        .catch(e => res.status(400).json(e))
}

module.exports = {
    feedLoad
}