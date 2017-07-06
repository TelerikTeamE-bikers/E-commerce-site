const express = require('express');

module.exports = (app, controllers) => {
    let router = new express.Router();
    let controller = controllers.spareparts;

    router
        .get('/', controller.loadSpareParts);

    app.use('/Bike-Spare-Parts', router);

    return router;
};