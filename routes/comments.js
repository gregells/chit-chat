const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// POST /posts/:id/comments (create review for a movie)
router.post('/posts/:id/comments', ensureLoggedIn, commentsController.create);

// DELETE /comments/:id
router.delete('/comments/:id', ensureLoggedIn, commentsController.delete);

// GET /comments/:id/edit
router.get('/comments/:id/edit', ensureLoggedIn, commentsController.edit);

// PUT /comments/:id
router.put('/comments/:id', ensureLoggedIn, commentsController.update);

// POST /comments/:id/up
router.post('/comments/:id/up', ensureLoggedIn, commentsController.toggleThumbsUp);

module.exports = router;