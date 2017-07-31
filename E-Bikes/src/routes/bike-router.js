const express = require('express');

module.exports = (app, controllers) => {
    const router = new express.Router();
    const controller = controllers.bike;

    router
        .get('/allbikes', (req, res) => {
            return controller.getAll(req, res);
        })
        .get('/allbikes/:id', (req, res, next) => {
            return controller.getBikeDetails(req, res, next);
        })
        .get('/getBikesByFilter?:qwery', (req, res) => {
            return controller.getBikesByFilter(req, res);
        })
        .get('/getBikesByProperty?:query', (req, res) => {
            return controller.getBikesByProperty(req, res);
        });

    app.use('/bike', router);

    return router;
};