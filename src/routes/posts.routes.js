const express = require('express');

const asyncHandler = require('../middleware/asyncHandler');

const {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
} = require('../controllers/posts.controller');

const router = express.Router();

router.get('/', asyncHandler(getAllPosts));
router.post('/', asyncHandler(createPost));

router.get('/:id', asyncHandler(getPostById));
router.put('/:id', asyncHandler(updatePost));
router.delete('/:id', asyncHandler(deletePost));

module.exports = router;
