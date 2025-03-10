var express = require('express');
var router = express.Router();
const postsController = require('../controllers/posts');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// All roots start with /posts

// GET /posts
router.get('/', postsController.index);

// GET /posts/new
router.get('/new', ensureLoggedIn, postsController.new);

// GET /posts/myposts
router.get('/myposts', ensureLoggedIn, postsController.myPosts);

// GET /posts/search
router.get('/search', postsController.search);

// GET /posts/:id (show functionality)
router.get('/:id', postsController.show);

// POST /posts
router.post('/', ensureLoggedIn, postsController.create);

// DELETE /posts/:id/
router.delete('/:id/', ensureLoggedIn, postsController.delete);

// GET /posts/:id/edit
router.get('/:id/edit', ensureLoggedIn, postsController.edit);

// PUT /posts/:id
router.put('/:id', ensureLoggedIn, postsController.update);

// POST /posts/:id/up
router.post('/:id/up', ensureLoggedIn, postsController.toggleThumbsUp);

// POST /posts/:id/down
router.post('/:id/down', ensureLoggedIn, postsController.toggleThumbsDown);

module.exports = router;
