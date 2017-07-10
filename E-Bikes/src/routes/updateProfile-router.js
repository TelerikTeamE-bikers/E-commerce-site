const express = require('express');

module.exports = (app, controllers) => {
    let router = new express.Router();
    let controller = controllers.updateProfile;

    router
        .get('/', controller.loadupdateProfile);

    app.use('/updateProfile', router);

    return router;
};