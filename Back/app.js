const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/auth.route');
const userRouter = require('./routes/user.route');
const postRouter = require('./routes/post.route');
const commentRouter = require('./routes/comment.route');
const likeRouter = require('./routes/like.route');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());

// Chemin statique pour les images :
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);
app.use('/api/comment', commentRouter);
app.use('/api/likes', likeRouter);

module.exports = app;