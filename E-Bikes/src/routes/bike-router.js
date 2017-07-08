const express = require('express');

module.exports = (app, controllers) => {
    let router = new express.Router();
    let controller = controllers.bike;

    router.get('/allbikes', controller.getAll);

    app.use('/bike', router);
    app.use('/', router);

    return router;
};