const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

const posts = [];

app.get('/', (req, res) => {
    res.json({ message: 'Blogging Platform API is running' });
});

app.get('/posts', (req, res) => {
    res.json(posts);
});

app.get('/posts/:id', (req, res) => {
    const postId = Number(req.params.id);

    if (!Number.isInteger(postId) || postId <= 0) {
        return res.status(400).json({
            error: 'Post ID must be a positive integer'
        });
    }

    const post = posts.find(post => post.id === postId);

    if (!post) {
        return res.status(404).json({
            error: `Post with ID ${postId} not found`
        });
    }

    res.json(post);
});

app.post('/posts', (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({
            error: 'title and content are required'
        });
    }

    const post = {
        id: posts.length + 1,
        title: title,
        content: content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    posts.push(post);

    res.status(201).json(post);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});