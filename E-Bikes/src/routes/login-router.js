const express = require('express');

module.exports = (app, controllers) => {
    const router = new express.Router();
    const controller = controllers.login;

    router
        .get('/', controller.loadLogin);

    app.use('/login', router);

    return router;
};