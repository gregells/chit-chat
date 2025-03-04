const Post = require('../models/post');

module.exports = {
  create,
  delete: deleteComment,
  edit,
  update
};

async function create(req, res) {
  // Find the post that the comment is to be added to:

  const post = await Post.findById(req.params.id);

  // Add the user information:
  req.body.commentAuthor = req.user._id;
  req.body.commentAuthorName = req.user.name;
  req.body.commentAuthorAvatar = req.user.avatar;

  // Push the new comment to the array of comments:
  post.comments.push(req.body);
  try {
    // Try save changes to the post:
    await post.save();
  } catch (err) {
    console.log(err);
  }

  // Redirect the request since data has changed:
  res.redirect(`/posts/${ post._id }`);
}

function deleteComment(req, res, next) {
  // Find the post with the comment to be deleted:
  Post.findOne({
    'comments._id': req.params.id,
    'comments.commentAuthor': req.user._id
  }).then(function(post) {
    if(!post) return res.redirect('/posts');
    post.comments.remove(req.params.id);
    post.save().then(function() {
      res.redirect(`/posts/${ post._id }`);
    }).catch(function(err) {
      return next(err);
    });
  });
}

function edit(req, res, next) {
  // Find the post with the comment to be edited:
  Post.findOne({
    'comments._id': req.params.id,
    'comments.commentAuthor': req.user._id
  }).then(function(post) {
    if(!post) return res.redirect('/posts');
    // Find the index of the comment to be edited:
    const index = post.comments.findIndex((comment) => comment._id == req.params.id);

    // Save a copy of the comment:
    const comment = post.comments[index];

    // TO BE REFACTORED:
    post.save().then(function() {
      // Render the comment into it's ownview:
      res.render('comments/edit', {
        title: 'Edit Comment',
        comment
      });
    }).catch(function(err) {
      return next(err);
    });
  });
}

async function update(req, res) {
  // Find the post with the comment to be edited:
  const post = await Post.findOne({
    'comments._id': req.params.id,
    'comments.commentAuthor': req.user._id
  });
  // Find the index of the comment to be edited:
  const index = post.comments.findIndex((comment) => comment._id == req.params.id);

  // Update the comment and save the post:
  post.comments[index].commentContent = req.body.commentContent;
  await post.save();

  // Redirect after CRUDing data:
  res.redirect(`/posts/${ post._id }`);
}