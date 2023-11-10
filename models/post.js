const mongoose = require('mongoose');
// Shortcut to the mongoose.Schema class:
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    commentContent: {type: String, required: true},
    commentAuthor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    commentAuthorName: String,
    commentAuthorAvatar: String,
    commentThumbsUp: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    commentThumbsDown: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
});

const postSchema = new Schema({
    postContent: {type: String, required: true},
    postAuthor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    postAuthorName: String,
    postAuthorAvatar: String,
    comments: [commentSchema],
    postThumbsUp: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    postThumbsDown: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
});

// Compile the Schema into a model and export it:
module.exports = mongoose.model('Post', postSchema);