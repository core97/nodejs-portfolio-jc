const express = require('express');

const postController = require('../controllers/post.controller');
const { isAuthenticated } = require('../middlewares/isAuthenticated');

const router = express.Router();

// http://localhost:8080/post
router.get('/', postController.getAllPosts);

// http://localhost:8080/post/:id
router.get('/:id', postController.getPostById);

// http://localhost:8080/post
router.post('/', [isAuthenticated], postController.createPost);

// http://localhost:8080/post/:id
router.delete('/:id', [isAuthenticated], postController.deletePost);

// http://localhost:8080/post
// router.delete('/', postController.deleteAllPosts);

// http://localhost:8080/post/:id
router.put('/:id', [isAuthenticated], postController.updatePost);


module.exports = router;
