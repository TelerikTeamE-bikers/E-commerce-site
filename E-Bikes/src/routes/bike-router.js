const express = require('express');

module.exports = (app, controllers) => {
    let router = new express.Router();
    let controller = controllers.bike;

    router
        .get('/allbikes', controller.getAll);

    app.use('/bike', router);

    return router;
};