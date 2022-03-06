const express = require('express');
const router = express.Router();
const authorize = require('../middlewares/authorize');
const multer = require('../middlewares/multer');
const userController = require('../controllers/user.controller');

router.get('/', authorize, userController.getAllUsers);
router.get('/:id', authorize, userController.getUser);
router.patch('/updateProfile/:userId', authorize, multer.single("imageUrl"), userController.updateProfile);
router.delete('/:id', authorize, userController.deleteProfile);

module.exports = router;