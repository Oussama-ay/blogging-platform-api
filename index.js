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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});