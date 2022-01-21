const express = require('express');
const router = express.Router();
const passwordValidator = require('../middlewares/passwordValidator');
const userController = require('../controllers/user.controller');
const authorize = require('../middlewares/authorize');
const multer = require('../middlewares/multer');

router.post('/signup', passwordValidator, userController.signup);
router.post('/login', userController.login);
router.put('/updateProfile/:userId', authorize, multer, userController.updateProfile);
router.delete('/deleteProfile/:userId', authorize, userController.deleteProfile);

module.exports = router;