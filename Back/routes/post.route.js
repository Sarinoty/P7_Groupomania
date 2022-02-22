const express = require('express');
const router = express.Router();
const authorize = require('../middlewares/authorize');
const postController = require('../controllers/post.controller');
const multer = require('../middlewares/multer');

router.get('/', authorize, postController.getAllPosts);
/*router.get('/:id', authorize, postController.getPostByUser); */
router.post('/', authorize, multer.single("imgContent"), postController.addPost);
//router.put('/:id', authorize, multer, postController.updatePost);
router.delete('/:id', authorize, postController.deletePost);

module.exports = router;