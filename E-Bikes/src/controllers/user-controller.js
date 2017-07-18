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
            return res.render('signup', {
                user: req.user,
            });
        },
        logInUser(req, res) {
            return res.render('login', {
                user: req.user,
            });
        },
        registerNewUser(req, res) {
            // console.log(req.body.email);
            MongoClient.connect(constants.DB_URL, (err, db) => {
                const user = {
                    email: req.body.email,
                    password: req.body.password,
                };
                db.collection('users').insertOne(user, (e, results) => {
                    req.login(results.ops[0], () => { // the user takes results.ops[0] in the session and this is used in loadProfile as req.user
                        // console.log(results);
                        res.redirect('/auth/myProfile');
                    });
                });
            });
        },
        loadProfile(req, res) {
            res.render('myProfile', {
                email: req.user.email,
                user: req.user, // req.user comes from passport
            });
        },
        loadUpdateProfile(req, res) {
            res.render('updateProfile', {
                user: req.user,
            });
        },
        // registerExistingUser(req, res) {
        //     console.log('Register new user');
        //     passport.authenticate('local', {
        //         failureRedirect: '/auth/login',
        //     }, () => {
        //         res.redirect('/auth/myProfile');
        //     });
        // },
    };
};