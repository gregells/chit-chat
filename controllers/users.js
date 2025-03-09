const User = require('../models/user');
const Post = require('../models/post');

module.exports = {
  index,
  show
}

async function index(req, res) {
  const users = await User.find({});
  res.render('users/index', { title: 'All Users', users });
}

async function show(req, res) {
  // Find the user:
  const user = await User.findById(req.params.id);
  // Find the user's posts:
  const posts = await Post.find({
    'postAuthor': req.params.id
  });

  const lastChar = user.name[user.name.length - 1];
  const title = lastChar === 's' ? `${user.name}' Posts` : `${user.name}'s Posts`;

  res.render('users/show', { title, user, posts });
}