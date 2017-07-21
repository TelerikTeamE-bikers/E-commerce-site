const express = require('express');

module.exports = (app, controllers) => {
    const router = new express.Router();
    const controller = controllers.home;

    router
        .get('/', (req, res) => {
            return controller.loadHome(req, res);
        })
        .get('/home', (req, res) => {
            controller.loadHome(req, res);
        });

    app.use('/', router);

    return router;
};