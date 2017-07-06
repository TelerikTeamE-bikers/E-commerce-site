const express = require('express');

module.exports = (app, controllers) => {
    let router = new express.Router();
    let controller = controllers.signup;

    router
        .get('/', controller.loadSignup);

    app.use('/signup', router);

    return router;
};