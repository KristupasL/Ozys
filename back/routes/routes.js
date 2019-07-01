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
    .post(middleware.authenticate, commentController.createComment)

router.route('/register')
    .post(userController.register)

router.route('/login')
    .post(userController.login)

router.route('/logout')
    .get(middleware.authenticate, userController.logout)

router.route('/post')
    .post(middleware.authenticate, postController.createPost)

router.route('/like/:id')
    .post(middleware.authenticate, postController.like)

router.route('/feedLoad')
    .get(middleware.authenticate, feedController.feedLoad)

module.exports = router