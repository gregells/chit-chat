var express = require('express');
var router = express.Router();
const postsController = require('../controllers/posts');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// All roots start with /posts

// GET /posts
router.get('/', postsController.index);

// GET /posts/new
router.get('/new', ensureLoggedIn, postsController.new);

// GET /posts/:id (show functionality)
router.get('/:id', postsController.show);

// POST /posts
router.post('/', ensureLoggedIn, postsController.create);

// DELETE /posts/:id/
router.delete('/:id/', postsController.delete);

// GET /posts/:id/edit
router.get('/:id/edit', postsController.edit);

// PUT /posts/:id
router.put('/:id', postsController.update);

module.exports = router;
