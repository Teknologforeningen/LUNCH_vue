const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: String,
    content: String,
    date: {type: Date, default: Date.now},
    visible: {type: Boolean, default: true}
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;