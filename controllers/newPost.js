module.exports = (req, res) => {
    const data = req.flash('data')[0];
    if (req.session.userId) {
        if (typeof data != "undefined") {
            title = data.title
            description = data.description
            image = data.image
        }

        // New post form
        res.render('create', {
            errors: req.flash('validationErrors')
        });        // Create 
    } else {
        // Renders login page if user
        // attempts to make a post
        res.redirect('create', {
            errors: req.flash('validationErrors')
        });
    }
};