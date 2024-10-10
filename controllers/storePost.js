const path = require('path');
const BlogPost = require('../models/BlogPost');

module.exports = (req, res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, '..', 'public/assets/img', image.name),
        async (error) => {
            const validationErrors = Object.keys(error.errors).map(key =>
                error.errors[key].message
            );
            req.flash('validationErrors', validationErrors);
            req.flash('data', req.body)
            res.redirect('/posts/new');
            await BlogPost.create({
                ...req.body,
                image: "/assets/img/" + image.name
            });
        });
}