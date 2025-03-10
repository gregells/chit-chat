const Post = require('../models/post');

module.exports = {
  index,
  show,
  myPosts,
  search,
  new: newPost,
  create,
  delete: deletePost,
  edit,
  update,
  toggleThumbsUp,
  toggleThumbsDown
};

async function index(req, res) {
  const posts = await Post.find({});
  res.render('posts/index', { title: 'All Posts', posts });
}

async function show(req, res) {
  // Find the post:
  const post = await Post.findById(req.params.id);
  res.render('posts/show', { title: 'Post Details', post });
}

async function myPosts(req, res) {
  // Find the posts by the logged in user:
  const posts = await Post.find({
      'postAuthor': req.user._id
    });
  res.render('posts/myPosts', { title: 'My Posts', posts });
}

async function search(req, res) {
  // Find the posts where the content matches the search term:
  const posts = await Post.find({
      'postContent': new RegExp(req.query.searchTerm, 'i')
    });
  res.render('posts/search', { title: 'Search Results', posts, searchTerm: req.query.searchTerm });
}

function newPost(req, res) {
  // errorMsg if the create action fails
  res.render('posts/new', { title: 'New Post', errorMsg: ''});
}

async function create(req, res) {
  console.log(req.body.postContent);
  // Add the user information:
  req.body.postAuthor = req.user._id;
  req.body.postAuthorName = req.user.name;
  req.body.postAuthorAvatar = req.user.avatar;

  try {
    const post = await Post.create(req.body);
    // Redirect to the new posts show functionality:
    res.redirect(`/posts/${ post._id }`);
  } catch (err) {
    // Give error message if unsuccesful:
    console.log(err);
    res.render('posts/new', { errorMsg: err.message, title: 'Error' });
  }
}

async function deletePost(req, res) {
  const post = await Post.findById(req.params.id);
  
  // Allow only the user who created the post to delete it:
  if (!req.user._id.equals(post.postAuthor)) {
    console.log('This user did not create the post...');
    return res.redirect('/posts');
  }
  
  try {
    await Post.findByIdAndDelete(req.params.id);
    // Redirect after CRUDing data:
    res.redirect('/posts');
  } catch (err) {
    console.log(err);
  }
}

async function edit(req, res) {
  const post = await Post.findById(req.params.id);
  
  // Allow only the user who created the post to see the edit page:
  if (!req.user._id.equals(post.postAuthor)) {
    console.log('This user did not create the post...');
    return res.redirect('/posts');
  }
  
  // Render the prefilled form:
  res.render('posts/edit', {
    title: 'Edit Post',
    post
  });
}

async function update(req, res) {
  const post = await Post.findById(req.params.id);
  post.postContent = req.body.postContent;
  
  // Allow only the user who created the post to update it:
  if (!req.user._id.equals(post.postAuthor)) {
    console.log('This user did not create the post...');
    return res.redirect('/posts');
  }

  try {
    await post.save();
    
    // Redirect after CRUDing data:
    res.redirect(`/posts/${ req.params.id }`);
  } catch (err) {
    console.log(err);
  }
}

async function toggleThumbsUp(req, res) {
  // Find the post where the thumbsUp is to be toggled:
  const post = await Post.findById(req.params.id);
  
  // Check if the logged in user has already given it a thumbsUp:
  if (post.postThumbsUp.includes(req.user._id)) {
    // Remove the logged in users _id from the array of postThumbsUp:
    const index = post.postThumbsUp.indexOf(req.user._id);
    post.postThumbsUp.splice(index, 1);
  } else {
    // Push the logged in users _id to the array of postThumbsUp:
    post.postThumbsUp.push(req.user._id);

    // If the logged user has currently thumbsDown'ed the post, remove the thumbsDown:
    if (post.postThumbsDown.includes(req.user._id)) {
      // Remove the logged in users _id from the array of postThumbsDown:
      const index = post.postThumbsDown.indexOf(req.user._id);
      post.postThumbsDown.splice(index, 1);
    }
  }

  // To-do: Use the referer attribute to redirect user back to the page they were on:
  console.log('the Referer is: ', req.get('referer'));

  try {
    await post.save();

    // Redirect after CRUDing data:
    res.redirect(`/posts/${ post._id }`);
  } catch (err) {
    console.log(err);
  }
}

async function toggleThumbsDown(req, res) {
  // Find the post where the thumbsDown is to be toggled:
  const post = await Post.findById(req.params.id);
  
  // Check if the logged in user has already given it a thumbsDown:
  if (post.postThumbsDown.includes(req.user._id)) {
    // Remove the logged in users _id from the array of postThumbsDown:
    const index = post.postThumbsDown.indexOf(req.user._id);
    post.postThumbsDown.splice(index, 1);
  } else {
    // Push the logged in users _id to the array of postThumbsDown:
    post.postThumbsDown.push(req.user._id);

    // If the logged user has currently thumbsUp'ed the post, remove the thumbsUp:
    if (post.postThumbsUp.includes(req.user._id)) {
      // Remove the logged in users _id from the array of postThumbsUp:
      const index = post.postThumbsUp.indexOf(req.user._id);
      post.postThumbsUp.splice(index, 1);
    }
  }

  // To-do: Use the referer attribute to redirect user back to the page they were on:
  console.log('the Referer is: ', req.get('referer'));

  try {
    await post.save();

    // Redirect after CRUDing data:
    res.redirect(`/posts/${ post._id }`);
  } catch (err) {
    console.log(err);
  }
}
