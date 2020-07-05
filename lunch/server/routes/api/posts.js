const express = require('express');
const Post = require('../../../models/Post');

const router = express.Router();

router.get('/', (req, res) => {
    Post.find({}, (err, posts) => {
        if (err) {
            return res.status(500).json({
                title: 'server error',
                error: err
            });
        } else {
            res.send(posts);
        }
    });
});

router.post('/', (req, res) => {
    const post = JSON.parse(req.body.text);
    Post.findOne({ _id:post._id }, (err, result) => {
        if (err) {
            return res.status(500).json({
                title: 'server error',
                error: err
            });
        } else if (result) {
            console.log("exists");
            result.title = post.title;
            result.content = post.content;
            result.visible = post.visible;
            result.save();
        } else {
            console.log("does not exist")
            const newPost = new Post({
                title: post.title,
                content: post.content
            });
            
            newPost.save(err => {
                if (err) {
                    return res.status(500).json({
                        title: 'server error',
                        error: err
                    });
                } else {
                    res.status(201).send();
                }
            });
        }
    });    
});

router.delete('/:id', (req, res) => {
    Post.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            return res.status(500).json({
                title: 'server error',
                error: err
            });
        } else {
            res.status(201).send();
        }
    });
});

module.exports = router;