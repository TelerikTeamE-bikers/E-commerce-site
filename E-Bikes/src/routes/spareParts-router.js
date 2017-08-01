const express = require('express');

module.exports = (app, controllers) => {
    const router = new express.Router();
    const controller = controllers.spareparts;

    router
        .get('/', controller.loadSpareParts);

    app.use('/Bike-Spare-Parts', router);

    return router;
}; // eslint-disable-line