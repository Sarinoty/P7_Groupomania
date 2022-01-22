const express = require('express');
const router = express.router();
const authorize = require('../middlewares/authorize');
const commentController = require('../controllers/comment.controller');


router.get('/', authorize, commentController.getAllComments);
router.get('/:id', authorize, commentController.getCommentByUser);
router.post('/', authorize, commentController.addComment);
router.put('/:id', authorize, commentController.updateComment);
router.delete('/:id', authorize, commentController.deleteComment);

router.get('/:id/liked', authorize, commentController.isItLiked);
router.get('/id/likes', authorize, commentController.howManyLikes);
router.put('/:id/like', authorize, commentController.likePost);

module.exports = router;