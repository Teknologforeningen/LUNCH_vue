const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const Hours = require('./models/Hours');
const Price = require('./models/Price');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost/lunch');

mongoose.connection.once('open', () => {
    console.log('Connected to lunch db');
}).on('error', (err) => {
    console.log('Failed to connect to db: ' + err);
});

const newUser = new User({
    username: 'test',
    password: bcrypt.hashSync('test123', 10)
});

newUser.save(err => {
    if (err) {
        console.log('Could not save user');
    } else {
        console.log('User saved successfully');
    }
});

const newPost = new Post({
    title: 'Random title 1',
    content: 'According to all known laws of aviation, there is no way that a bee should be able to fly.',
    visible: true
});

newPost.save(err => {
    if (err) {
        console.log('Could not save post');
    } else {
        console.log('Post saved successfully');
    }
});

const newHours = new Hours({
    hours: 'Mon - Fri 10:30 - 15:00'
});

newHours.save(err => {
    if (err) {
        console.log('Could not save hours');
    } else {
        console.log('Hours saved successfully');
    }
});

const newPrice = new Price({
    description: 'A great meal',
    priceStudent: 2.60,
    priceNormal: 5.00
});

newPrice.save(err => {
    if (err) {
        console.log('Could not save price');
    } else {
        console.log('Price saved successfully');
    }
});

