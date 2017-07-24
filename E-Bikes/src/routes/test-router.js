const express = require('express');

module.exports = (app, controllers) => {
    let router = new express.Router();
    let controller = controllers.user;

    // router
    //     .get('/testroute', controller.registerUser);

    app.use('/', router);

    return router;
};