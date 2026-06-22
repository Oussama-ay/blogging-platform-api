# Blogging Platform API

A REST API for creating, reading, updating, deleting, and searching blog posts.

This project is based on the roadmap.sh Blogging Platform API project:

https://roadmap.sh/projects/blogging-platform-api

## Features

- Create blog posts
- Get all posts
- Get one post by ID
- Update posts
- Delete posts
- Search posts by title or content
- PostgreSQL persistence
- Request logging middleware
- 404 route handling
- Centralized error handling
- Input validation

## Tech Stack

- Node.js
- Express
- PostgreSQL
- node-postgres (`pg`)
- dotenv

## Project Structure

```txt
src/
├── app.js
├── config/
│   └── db.js
├── controllers/
│   └── posts.controller.js
├── middleware/
│   ├── asyncHandler.js
│   ├── errorHandler.js
│   ├── logger.js
│   └── notFound.js
├── routes/
│   └── posts.routes.js
└── services/
    └── posts.service.js
