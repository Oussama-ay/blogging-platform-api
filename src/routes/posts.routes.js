const express = require('express');

const {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
} = require('../controllers/posts.controller');

const router = express.Router();

router.get('/', getAllPosts);
router.post('/', createPost);

router.get('/:id', getPostById);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;