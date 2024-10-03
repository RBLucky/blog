// Import modules
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');

mongoose.connect('mongodb://0.0.0.0:27017/blog_db', { useNewUrlParser: true });

// Initialize express
const app = new express();

// Set templating engine
app.set('view engine', 'ejs');

// Serves static files from public folder
app.use(express.static('public'));

// Middleware
app.use(express.json())
app.use(express.urlencoded())

// Route handling for each route
app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({});
    res.render('index', { blogposts });
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/post/:id', async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id);
    res.render('post', {
        blogpost
    })
})

app.get('/posts/new', (req, res) => {
    res.render('create')
})

app.post('/posts/store', async (req, res) => {
    await BlogPost.create(req.body)
    res.redirect('/');
})

// Set port to listen on
app.listen(4000, () => {
    console.log('App listening on port 4000')
})