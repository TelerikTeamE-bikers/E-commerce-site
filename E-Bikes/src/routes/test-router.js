const express = require('express');

module.exports = (app, controllers) => {
    let router = new express.Router();
    let controller = controllers.bike;

    router
        .post('/testr', controller.createTestBikes);

    app.use('/', router);

    return router;
};