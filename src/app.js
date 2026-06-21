const express = require('express');

const postsRouter = require('./routes/posts.routes');
const logger = require('./middleware/logger');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
    res.json({
        message: 'Blogging Platform API is running'
    });
});

app.use('/posts', postsRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;