const express = require('express');
const cors = require('cors');
//const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth.route');
const userRouter = require('./routes/user.route');
const postRouter = require('./routes/post.route');
const commentRouter = require('./routes/comment.route');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());
//app.use(cookieParser());

// Chemin statique pour les images :
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);
app.use('/api/comment', commentRouter);

module.exports = app;