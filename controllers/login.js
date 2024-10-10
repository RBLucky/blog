
module.exports = (req, res) => {
    let username = "";
    let password = "";
    const details = req.flash('data')[0];

    //data persists
    if (typeof details != "undefined") {
        username = details.username
        password = details.password
    }

    res.render('login', {
        errors: req.flash('loginError'),
        username: username,
        password: password
    }) //login.ejs
    console.log(details);
};