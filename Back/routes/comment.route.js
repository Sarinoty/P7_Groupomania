const express = require('express');
const router = express.Router();
const authorize = require('../middlewares/authorize');
const commentController = require('../controllers/comment.controller');

router.get('/', authorize, commentController.getAllComments);
router.get('/:id', authorize, commentController.getCommentByPostId);
router.post('/', authorize, commentController.addComment);
router.delete('/:id', authorize, commentController.deleteComment);
router.delete('/post/:id', authorize, commentController.deleteCommentByPostId);

module.exports = router;