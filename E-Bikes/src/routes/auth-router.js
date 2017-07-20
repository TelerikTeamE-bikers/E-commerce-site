const express = require('express');
const passport = require('passport');

module.exports = (app, controllers) => {
    const router = new express.Router();
    const controller = controllers.user;
    const authPaths = ['/myProfile', '/updateProfile', '/logout'];

    router
        .get('/signup', controller.signUpUser)
        .get('/login', controller.logInUser)
        .post('/signup', controller.registerNewUser)
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
        .get('/myProfile', controller.loadProfile)
        .get('/updateProfile', controller.loadUpdateProfile)
        .get('/logout', function(req, res) {
            req.logout();
            res.redirect('/');
        });

    app.use('/auth', router);
    // app.use('/', router);

    return router;
};