const PostModel = require("../models/postModel.js")

let feedLoad = (req, res) => {
    PostModel
        .find({})
        .limit(10)
        .sort({
            date: 'desc'
        })
        .then(items => {
            res.json(items);
        })
        .catch(e => res.status(400).json(e))
}

module.exports = {
    feedLoad
}