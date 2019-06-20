const router = require('express').Router()
const commentController = require('../controllers/commentController')
const userController = require('../controllers/userController')
const postController = require('../controllers/postController')
const feedController = require('../controllers/feedController')
const middleware = require('../middleware/middleware')

router.get('/', (request, response) => {
    response.json({
        data: {
            message: "API is working!"
        },
        timestamp: new Date().getTime()
    })
})

router.route('/comment')
    .post(commentController.comment)

router.route('/post')
    .post(postController.post)

router.route('/like')
    .post(postController.like)

router.route('/register')
    .post(userController.register)

router.route('/login')
    .post(userController.login)

router.route('/logout')
    .get(middleware.authenticate, userController.logout)

module.exports = router