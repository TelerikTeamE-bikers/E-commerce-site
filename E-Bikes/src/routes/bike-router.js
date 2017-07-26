const express = require('express');

module.exports = (app, controllers) => {
    const router = new express.Router();
    const controller = controllers.bike;

    router.get('/allbikes', (req, res) => {
        return controller.getAll(req, res);
    });

    router.get('/allbikes/:id', (req, res) => {
        return controller.getBikeDetails(req, res);
    });
    // app.use('/', router);
    app.use('/bike', router);

    return router;
};