const express = require('express');
const router = express.Router();
const passwordValidator = require('../middlewares/passwordValidator');
const userController = require('../controllers/user.controller');

router.post('/signup', passwordValidator, userController.signup);
router.post('/login', userController.login);
/* router.get('/logout', userController.logout); */

module.exports = router;