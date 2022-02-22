const express = require('express');
const router = express.Router();
const authorize = require('../middlewares/authorize');
const likesController = require('../controllers/likes.controller');

router.get('/', authorize, likesController.getLikes);
router.delete('/:postId/:userId', authorize, likesController.deleteLike);
router.post('/:postId/:userId', authorize, likesController.addLike);
/*router.get('/:id/liked', authorize, postController.isItLiked);
router.get('/id/likes', authorize, postController.howManyLikes);
router.put('/:id/like', authorize, postController.likePost); */

module.exports = router;