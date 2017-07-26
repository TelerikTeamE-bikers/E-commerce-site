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
                        throw new Error('User already exists. Please try with another email');
                    }
                    return data.user.create(bodyUser);
                }).then((dbUser) => {
                    req.login(dbUser, () => {
                        req.flash('success', 'Successful registration');
                        res.redirect('/auth/myProfile');
                    });
                }).catch((err) => {
                    req.flash('error', err.message);
                    res.redirect('/auth/signUp');
                });
        },
        getProfile(req, res) {
            data.user.findByUsername(req.user.email)
                .then((dbUser) => {
                    res.render('myProfile', {
                        email: dbUser.email,
                        address: dbUser.address,
                        phone: dbUser.phone,
                        name: dbUser.name,
                    });
                });
        },
        getUpdateProfile(req, res) {
            res.render('updateProfile', {
                user: req.user,
            });
        },
        getMyCart(req, res) {
            res.render('myCart', {
                user: req.user,
            });
        },
        updateProfile(req, res) {
            //todo if some inputs are empty not to write it in DB???
            const bodyUser = req.body;
            bodyUser._id = req.user._id;

            data.user.findByUsername(bodyUser.email)
                .then((dbUser) => {
                    if (dbUser) {
                        throw new Error('Email already exists. Please try with another email!');
                    }
                    return data.user.updateById(bodyUser);
                }).then((updatedUser) => {
                    req.flash('success', 'You successfully update your profile');
                    res.redirect('/auth/myProfile');
                }).catch((err) => {
                    req.flash('error', err.message);
                    res.redirect('/auth/updateProfile');
                });
        },
    };
};