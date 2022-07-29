
const bcrypt = require('bcrypt')
const User = require('../models/user')
module.exports = (req, res) => {
    validationErrors = [];
    const { username, password } = req.body;
    if (username && password) {
        User.findOne({ username: username }, (error, user) => {
            if (user) {
                bcrypt.compare(password, user.password, (error, same) => {
                    if (same) {
                        req.session.userId = user._id;
                        // if passwords match
                        // store user session, will talk about it later
                        res.redirect('/');
                    } else {
                        // console.log(error);
                        validationErrors.push("Please enter valid password!");
                        req.flash('validationErrors', validationErrors);
                        req.flash('data', req.body);
                        res.redirect('/auth/login');
                    }
                })
            } else {
                // console.log("/auth/login::", user)
                // res.redirect('/auth/login');
                validationErrors.push("Username does not exist!");
                req.flash('validationErrors', validationErrors);
                req.flash('data', req.body);
                res.redirect('/auth/login');

            }
        });
    }
    else {
        if (!username) {
            validationErrors.push("Please provide username!");
            // req.flash('validationErrors', validationErrors);
        }
        if (!password) {
            validationErrors.push("please provide password!");

        }
        req.flash('validationErrors', validationErrors);
        req.flash('data', req.body);
        // console.log(req.session.validationErrors);
        res.redirect('/auth/login');
    }
}