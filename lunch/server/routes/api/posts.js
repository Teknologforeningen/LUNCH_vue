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
    const newPost = new Post({
        title: req.body.title,
        content: req.body.content
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