const express = require('express');
const userRouter = require('./src/routers/user.router');
const postRouter = require('./src/routers/post.router');
const app = express.Router();

app.use('/users' , userRouter);

app.use('/posts' , postRouter);

module.exports = app;