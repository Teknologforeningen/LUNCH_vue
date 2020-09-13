const express = require('express');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'upload/'});
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

router.get('/images/:id', (req, res) => {
    Post.findOne({'_id': req.params.id }, (err, post) => {
        if (err || post.image == undefined) {
            return res.status(500).json({
                title: 'server error',
                error: err
            });
        } else {
            res.contentType(post.contentType);
            res.send(post.image);
        }
    });
});

router.post('/', upload.single('image'), (req, res) => {
    const img = fs.readFileSync(req.file.path);
    const encodeImage = img.toString('base64');
    const post = {
        title: req.body.title,
        content: req.body.content,
        contentType: req.file.mimetype,
        image: new Buffer.alloc(req.file.size, encodeImage, 'base64')
    };
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
            result.contentType = post.contentType;
            result.image = post.image;
            result.save();
        } else {
            console.log("does not exist")
            const newPost = new Post({
                title: post.title,
                content: post.content,
                contentType: post.contentType,
                image: post.image
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