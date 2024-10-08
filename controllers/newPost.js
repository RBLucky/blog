module.exports = (req, res) => {
    if (req.session.userId) {
        // New post form
        res.render('create');        // Create 
    } else {
        // Renders login page if user
        // attempts to make a post
        res.redirect('/auth/login');
    }
};