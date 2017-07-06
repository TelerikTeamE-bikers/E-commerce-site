const express = require('express');

module.exports = (app, controllers) => {
    let router = new express.Router();
    let controller = controllers.login;

    router
        .get('/', controller.loadLogin);

    app.use('/login', router);

    return router;
};