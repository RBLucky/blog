// Import modules
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');
const fileUpload = require('express-fileupload');
const newPostController = require('./controllers/newPost');
const getPostController = require('./controllers/getPost');
const storePostController = require('./controllers/storePost');
const pagesController = require('./controllers/pagesController');
const homeController = require('./controllers/home');
const validateMiddleware = require('./middleware/validationMiddleware');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');


// const customMiddleware = (req, res, next) => {
//     console.log('Custom middleware called');
//     next();
// };



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

//app.use(customMiddleware);
app.use('/posts/store', validateMiddleware);

// Route handling for each route
app.get('/auth/register', newUserController);

app.post('./users/register', storeUserController);

app.get('/', homeController)

app.get('/about', pagesController.about);

app.get('/contact', pagesController.contact);

app.get('/post/:id', getPostController)

app.get('/posts/new', newPostController)

app.post('/posts/store', storePostController);

// Set port to listen on
app.listen(4000, () => {
    console.log('App listening on port 4000')
})