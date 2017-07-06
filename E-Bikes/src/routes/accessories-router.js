const express = require('express');

module.exports = (app, controllers) => {
    let router = new express.Router();
    let controller = controllers.accessories;

    router
        .get('/', controller.loadAccessories);

    app.use('/accessories', router);

    return router;
};