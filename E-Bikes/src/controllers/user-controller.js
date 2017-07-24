const userDomainModel = require('../models/domainModels/user-domainModel');
const bikeDomainModel = require('../models/domainModels/bike-domainModel');
const passport = require('passport');
const { SHA256 } = require('crypto-js');

module.exports = function(data, constants, errorHandler) {
    return {
        getSignUpForm(req, res) {
            return res.render('signup', {});
        },
        getLogInForm(req, res) {
            return res.render('login', {});
        },
        registerNewUser(req, res) {
            req.body.password = SHA256(req.body.password).toString();
            req.body.password_repeat = SHA256(req.body.password_repeat).toString();

            const bodyUser = req.body;
            data.user.findByUsername(bodyUser.email)
                .then((dbUser) => {
                    if (dbUser) {
                        throw new Error('User already exists');
                    }
                    return data.user.create(bodyUser);
                }).then((dbUser) => {
                    req.login(dbUser, () => {
                        // console.log(dbUser.email + 'test passport');
                        res.redirect('/auth/myProfile');
                    });
                }).catch((err) => {
                    console.log(err);
                    req.flash('error', err);
                });
        },
        getProfile(req, res) {
            res.render('myProfile', {
                email: req.user.email,
            });
        },
        getUpdateProfile(req, res) {
            res.render('updateProfile', {
                user: req.user,
            });
        },
    };
};