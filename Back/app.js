const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.route');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());

// Chemin statique pour les images :
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRouter);

module.exports = app;