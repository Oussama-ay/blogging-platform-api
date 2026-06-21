const postsService = require('../services/posts.service');

function parsePostId(idValue) {
    const postId = Number(idValue);

    if (!Number.isInteger(postId) || postId <= 0) {
        return null;
    }

    return postId;
}

function validatePostBody(body) {
    if (!body) return null
    const { title, content } = body;

    if (
        typeof title !== 'string' ||
        typeof content !== 'string' ||
        !title.trim() ||
        !content.trim()
    ) {
        return null;
    }

    return {
        title: title.trim(),
        content: content.trim()
    };
}

function getAllPosts(req, res) {
    if (!term || typeof term !== 'string') {
        return posts;
    }
    const { term } = req.query;

    const posts = postsService.getAllPosts(term);

    res.json(posts);
}

function getPostById(req, res) {
    const postId = parsePostId(req.params.id);

    if (!postId) {
        return res.status(400).json({
            error: 'Post ID must be a positive integer'
        });
    }

    const post = postsService.getPostById(postId);

    if (!post) {
        return res.status(404).json({
            error: `Post with ID ${postId} not found`
        });
    }

    res.json(post);
}

function createPost(req, res) {
    const postData = validatePostBody(req.body);

    if (!postData) {
        return res.status(400).json({
            error: 'title and content must be non-empty strings'
        });
    }

    const post = postsService.createPost(postData);

    res.status(201).json(post);
}

function updatePost(req, res) {
    const postId = parsePostId(req.params.id);

    if (!postId) {
        return res.status(400).json({
            error: 'Post ID must be a positive integer'
        });
    }

    const postData = validatePostBody(req.body);

    if (!postData) {
        return res.status(400).json({
            error: 'title and content must be non-empty strings'
        });
    }

    const updatedPost = postsService.updatePost(postId, postData);

    if (!updatedPost) {
        return res.status(404).json({
            error: `Post with ID ${postId} not found`
        });
    }

    res.json(updatedPost);
}

function deletePost(req, res) {
    const postId = parsePostId(req.params.id);

    if (!postId) {
        return res.status(400).json({
            error: 'Post ID must be a positive integer'
        });
    }

    const wasDeleted = postsService.deletePost(postId);

    if (!wasDeleted) {
        return res.status(404).json({
            error: `Post with ID ${postId} not found`
        });
    }

    res.status(204).send();
}

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
};