const express = require('express');
const passport = require('passport');

module.exports = (app, controllers) => {
    const router = new express.Router();
    const controller = controllers.user;
    const authPaths = ['/myProfile', '/updateProfile', '/logout'];

    router
        .get('/signup', (req, res) => {
            return controller.signUpUser(req, res);
        })
        .get('/login', (req, res) => {
            return controller.logInUser(req, res);
        })
        .post('/signup', (req, res) => {
            return controller.registerNewUser;
        })
        .post('/login',
            passport.authenticate('local', {
                successRedirect: '/auth/myProfile',
                failureRedirect: '/auth/signup',
                //failureFlash: true
            })
        )
        .all(authPaths, (req, res, next) => {
            if (!req.user) {
                res.redirect('/');
                return;
            }
            next();
        })
        .get('/myProfile', (req, res) => {
            return controller.loadProfile(req, res);
        })
        .get('/updateProfile', (req, res) => {
            return controller.loadUpdateProfile(req, res);
        })
        .get('/logout', function(req, res) {
            req.logout();
            res.redirect('/');
        });

    app.use('/auth', router);
    // app.use('/', router);

    return router;
};