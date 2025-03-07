const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const { authenticate } = require('../middlewares/auth,middleware');

router.use(authenticate);

router.post('/create', postController.createPost);

router.get('/list', postController.getAllPosts);

router.get('/user-posts', postController.getMyPosts);

router.get('/list/:id', postController.getPostById);

router.put('/update/:id', postController.updatePost);

router.delete('/delete/:id', postController.deletePost);

module.exports = router;