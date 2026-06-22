const pool = require('../config/db');

function mapPost(row)
{
    return {
        id: row.id,
        title: row.title,
        content: row.content,
        createdAt: row.created_at,
        updatedAt: row.updated_at
    };
}

async function getAllPosts(term)
{
    if (!term)
    {
        const result = await pool.query(`
            SELECT id, title, content, created_at, updated_at
            FROM posts
            ORDER BY id ASC
        `);

        return result.rows.map(mapPost);
    }

    const result = await pool.query(
        `
        SELECT id, title, content, created_at, updated_at
        FROM posts
        WHERE title ILIKE $1
           OR content ILIKE $1
        ORDER BY id ASC
        `,
        [`%${term}%`]
    );

    return result.rows.map(mapPost);
}

async function getPostById(id)
{
    const result = await pool.query(
        `
        SELECT id, title, content, created_at, updated_at
        FROM posts
        WHERE id = $1
        `,
        [id]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return mapPost(result.rows[0]);
}

async function createPost({ title, content }) {
    const result = await pool.query(
        `
        INSERT INTO posts (title, content)
        VALUES ($1, $2)
        RETURNING id, title, content, created_at, updated_at
        `,
        [title, content]
    );

    return mapPost(result.rows[0]);
}

async function updatePost(id, { title, content }) {
    const result = await pool.query(
        `
        UPDATE posts
        SET
            title = $1,
            content = $2,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $3
        RETURNING id, title, content, created_at, updated_at
        `,
        [title, content, id]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return mapPost(result.rows[0]);
}

async function deletePost(id) {
    const result = await pool.query(
        `
        DELETE FROM posts
        WHERE id = $1
        `,
        [id]
    );

    return result.rowCount > 0;
}   

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
};
