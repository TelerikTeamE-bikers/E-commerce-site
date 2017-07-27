const express = require('express');

module.exports = (app, controllers) => {
    let router = new express.Router();
    let controller = controllers.bike;

    router
        .get('/testr', controllers.user.getMyCart);

    app.use('/', router);

    return router;
};