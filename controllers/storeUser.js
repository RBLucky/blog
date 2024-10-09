
const User = require('../models/User.js');
const path = require('path');

module.exports = (req, res) => {
    User.create(req.body)
        .then((user) => {
            res.redirect('/');
        })
        .catch((error) => {
            Object.keys(error.errors).map(key => console.log(error.errors[key].message)
            )
            res.redirect('/auth/register');

        })
}