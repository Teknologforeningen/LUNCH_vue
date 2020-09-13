// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Models
const User = require('../models/User');

mongoose.connect('mongodb://localhost/lunch');

mongoose.connection.once('open', () => {
    console.log('Connected to lunch db');
}).on('error', (err) => {
    console.log('Failed to connect to db: ' + err);
});

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/login', (req, res) => {
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
            return res.status(500).json({
                title: 'server error',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'user not found',
                error: 'invalid credentials'
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'login failed',
                error: 'invalid credentials'
            });
        }
        let token = jwt.sign({ userId: user._id }, 'secretkey');
        return res.status(200).json({
            title: 'login success',
            token: token
        });
    });
});

const posts = require('./routes/api/posts');
const hours = require('./routes/api/hours');
const prices = require('./routes/api/prices');
const messages = require('./routes/api/messages');
const menu = require('./routes/api/menu');

app.use('/api/posts', posts);
app.use('/api/hours', hours);
app.use('/api/prices', prices);
app.use('/api/messages', messages);
app.use('/api/menu', menu);

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
    if (err) return console.log(err);
    console.log('Server running on port ' +  port);
});