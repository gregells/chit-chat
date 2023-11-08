const Post = require('../models/post');

module.exports = {
    index,
    show,
    new: newPost,
    create
};

async function index(req, res) {
    const posts = await Post.find({});
    res.render('posts/index', { title: 'All Posts', posts });
}

async function show(req, res) {
    const post = await Post.findById(req.params.id);
    res.render('posts/show', { title: 'Post Details', post });
}

function newPost(req, res) {
    // errorMsg if the create action fails
    res.render('posts/new', { title: 'New Post', errorMsg: ''});
}

async function create(req, res) {
    console.log(req.body.postContent);
    // Add the user information:
    req.body.postAuthor = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;

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