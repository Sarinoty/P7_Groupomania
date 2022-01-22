const express = require('express');
const router = express.Router();
const authorize = require('../middlewares/authorize');
const multer = require('../middlewares/multer');

router.get('/', authorize, userController.getAllUsers);
router.get('/:id', authorize, userController.getUser);
router.put('/updateProfile/:userId', authorize, multer, userController.updateProfile);
router.delete('/deleteProfile/:userId', authorize, userController.deleteProfile);

module.exports = router;