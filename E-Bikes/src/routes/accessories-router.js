const express = require('express');

module.exports = (app, controllers) => {
    const router = new express.Router();
    const controller = controllers.accessories;

    router
        .get('/', controller.loadAccessories);

    app.use('/accessories', router);

    return router;
}; // eslint-disable-line