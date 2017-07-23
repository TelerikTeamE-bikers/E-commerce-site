const errorHandler = require('../core/errorHandler');
const userDomainModel = require('../models/domainModels/user-domainModel');
const bikeDomainModel = require('../models/domainModels/bike-domainModel');
const { MongoClient } = require('mongodb');
const constants = require('../common/constants');
const passport = require('passport');

module.exports = function(data) {
    return {
        registerUser(req, res) {
            // let user = userDomainModel.getUser("go6o", "123");
            // console.log()
            // console.log("creating new user:")
            // console.log(user);
            // console.log()

            // let bike = bikeDomainModel.getBike("brand 1", "model 1", 100);
            // console.log()
            // console.log("creating new bike:")
            // console.log(bike);
            // console.log()

            // console.log()
            // console.log("adding bike to user cart:")
            // user.AddToCart(bike);
            // console.log(user);
            // console.log()

            // console.log()
            // console.log("saving user to db:")
            // data.user.createUser(user);
            //console.log()

            // console.log()
            // console.log("geting user from db:")
            // let foundUser = data.user.findUserByCredentials("go6o", "123");
            // console.log("Found user:", foundUser);

            data.user.findUserByCredentials('go6o', '123').then((user) => {
                console.log('Found user:', user);

                res.render('home', {});
            }).catch((err) => {
                errorHandler.handleError(req, res, err);
            });
        },
        signUpUser(req, res) {
            return res.render('signup', {});
        },
        logInUser(req, res) {
            return res.render('login', {});
        },
        registerNewUser(req, res) {
            const bodyUser = req.body;
            console.log(req.body.email);
            data.user.findByUsername(bodyUser)
                .then((dbUser) => {
                    if (dbUser) {
                        throw new Error('User already exists');
                    }

                    return data.user.create(bodyUser);
                }).then((dbUser) => {
                    req.login(dbUser, () => {
                        console.log(dbUser + 'test passport');
                        res.redirect('/auth/myProfile');
                    });
                }).catch((err) => {
                    req.flash('error', err);
                });
            // MongoClient.connect(constants.DB_URL, (err, db) => {
            //     const user = {
            //         email: req.body.email,
            //         password: req.body.password,
            //     };
            //     db.collection('users').insertOne(user, (e, results) => {
            //         req.login(user, () => {
            //             console.log(user + 'test passport');
            //             res.redirect('/auth/myProfile');
            //         });
            //     });
            // });
        },
        loadProfile(req, res) {
            res.render('myProfile', {
                email: req.user.email,
            });
        },
        loadUpdateProfile(req, res) {
            res.render('updateProfile', {
                user: req.user,
            });
        },
    };
};