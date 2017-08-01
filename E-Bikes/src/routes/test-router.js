const express = require('express');

module.exports = (app, controllers) => {
    const router = new express.Router();
    const controller = controllers.bike;

    router
        .post('/testr', controller.createTestBikes);

    app.use('/', router);

    return router;
}; // eslint-disable-line