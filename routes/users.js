var express = require('express');
var router = express.Router();
const usersController = require('../controllers/users');

// All roots start with /users

// GET /users
router.get('/', usersController.index);

// GET /users/:id (show functionality)
router.get('/:id', usersController.show);

module.exports = router;
