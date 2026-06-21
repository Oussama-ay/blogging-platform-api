let posts = [];

function getNextId() {
    if (posts.length === 0) {
        return 1;
    }

    return Math.max(...posts.map(post => post.id)) + 1;
}

function getAllPosts(term) {
    if (!term) {
        return posts;
    }

    const normalizedTerm = term.toLowerCase();

    return posts.filter(post =>
        post.title.toLowerCase().includes(normalizedTerm) ||
        post.content.toLowerCase().includes(normalizedTerm)
    );
}

function getPostById(id) {
    return posts.find(post => post.id === id);
}

function createPost({ title, content }) {
    const now = new Date().toISOString();

    const post = {
        id: getNextId(),
        title,
        content,
        createdAt: now,
        updatedAt: now
    };

    posts.push(post);

    return post;
}

function updatePost(id, { title, content }) {
    const post = getPostById(id);

    if (!post) {
        return null;
    }

    post.title = title;
    post.content = content;
    post.updatedAt = new Date().toISOString();

    return post;
}

function deletePost(id) {
    const postIndex = posts.findIndex(post => post.id === id);

    if (postIndex === -1) {
        return false;
    }

    posts.splice(postIndex, 1);

    return true;
}

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
};