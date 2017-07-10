const express = require('express');

module.exports = (app, controllers) => {
    let router = new express.Router();
    let controller = controllers.profile;

    router
        .get('/', controller.loadProfile);

    app.use('/myProfile', router);

    return router;
};