// Import modules
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');
const fileUpload = require('express-fileupload');

const customMiddleware = (req, res, next) => {
    console.log('Custom middleware called');
    next();
};

const validateMiddleware = (req, res, next) => {
    if (req.files == null || req.body.title == null) {
        return res.redirect('/posts/new')
    }
    next()
}

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

app.use(fileUpload());

app.use(customMiddleware);
app.use('/posts/store', validateMiddleware);

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

app.post('/posts/store', (req, res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, 'public/assets/img', image.name), async (error) => {
        await BlogPost.create({
            ...req.body,
        image: "/assets/img/" + image.name
    });
        res.redirect('/');
    });
});

// Set port to listen on
app.listen(4000, () => {
    console.log('App listening on port 4000')
})