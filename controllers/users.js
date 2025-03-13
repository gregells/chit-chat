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
  // Can't call it 'user' or else it will interfere with the navbar's conditional rendering.
  const userToShow = await User.findById(req.params.id);
  // Find the user's posts:
  const posts = await Post.find({
    'postAuthor': req.params.id
  });

  // Create the title, only putting an apostrophy when the user's name doesn't end in 's':
  const lastChar = userToShow.name[userToShow.name.length - 1];
  const title = lastChar === 's' ? `${userToShow.name}' Posts` : `${userToShow.name}'s Posts`;

  res.render('users/show', { title, userToShow, posts });
}