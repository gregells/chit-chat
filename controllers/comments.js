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
    await post.save();

    // Redirect after CRUDing data:
    res.redirect(`/posts/${ post._id }`);
  } catch (err) {
    console.log(err);
  }
}

async function deleteComment(req, res, next) {
  // Find the post with the comment to be deleted:
  const post = await Post.findOne({
    'comments._id': req.params.id,
    'comments.commentAuthor': req.user._id
  });
  if (!post) return res.redirect('/posts');

  const comment = post.comments.id(req.params.id);
  // Allow only the user who created the comment to delete it:
  if (!req.user._id.equals(comment.commentAuthor)) {
    console.log('This user did not create the post...');
    return res.redirect(`/posts/${post._id}`);
  }

  try {
    post.comments.remove(req.params.id);
    await post.save();
    
    // Redirect after CRUDing data:
    res.redirect(`/posts/${post._id}`);
  } catch (err) {
    console.log(err);
  }
}

async function edit(req, res, next) {
  // Find the post with the comment to be edited:
  const post = await Post.findOne({
    'comments._id': req.params.id,
    'comments.commentAuthor': req.user._id
  });
  if(!post) return res.redirect('/posts');

  const comment = post.comments.id(req.params.id);
  // Allow only the user who created the comment to see the edit page:
  if (!req.user._id.equals(comment.commentAuthor)) {
    console.log('This user did not create the post...');
    return res.redirect(`/posts/${post._id}`);
  }
  
  // Render the comment into it's own view:
  res.render('comments/edit', {title: 'Edit Comment', comment});
}

async function update(req, res) {
  // Find the post with the comment to be edited:
  const post = await Post.findOne({
    'comments._id': req.params.id,
    'comments.commentAuthor': req.user._id
  });
  const comment = post.comments.id(req.params.id);

  // Allow only the user who created the comment to update it:
  if (!req.user._id.equals(comment.commentAuthor)) {
    console.log('This user did not create the post...');
    return res.redirect(`/posts/${post._id}`);
  }

  Object.assign(comment, req.body);

  try {
    await post.save();
    
    // Redirect after CRUDing data:
    res.redirect(`/posts/${ post._id }`);
  } catch (err) {
    console.log(err);
  }
}