const express = require('express');
const { MongoClient } = require('mongodb');

module.exports = (app, controllers) => {
    const router = new express.Router();
    const controller = controllers.user;

    router
        .get('/signup', controller.signUpUser)
        .get('/login', controller.logInUser)
        .post('/signup', controller.registerNewUser)
        .get('/myProfile', controller.loadProfile);

    app.use('/auth', router);

    return router;
};