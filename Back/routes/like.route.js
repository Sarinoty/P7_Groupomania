const express = require('express');
const router = express.Router();
const authorize = require('../middlewares/authorize');
const likesController = require('../controllers/likes.controller');

router.get('/', authorize, likesController.getLikes);
router.delete('/deleteLike/:postId/:userId', authorize, likesController.deleteLike);
router.delete('/:id', authorize, likesController.deleteLikeByPostId);
router.delete('/user/:id', authorize, likesController.deleteLikeByUserId);
router.post('/:postId/:userId', authorize, likesController.addLike);

module.exports = router;