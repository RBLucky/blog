// Import modules
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/blog_db', {useNewUrlParser: true});

// Initialize express
const app = new express();

// Set templating engine
app.set('view engine', 'ejs');

// Serves static files from public folder
app.use(express.static('public'));

// Route handling for each route
app.get('/', (req, res) => {
    res.render('index');
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/post', (req, res) => {
    res.render('post')
})

app.get('/posts/new', (req, res) => {
    res.render('create')
})
// Set port to listen on
app.listen(4000, () => {
    console.log('App listening on port 4000')
})