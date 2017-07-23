const express = require('express');

module.exports = (app, controllers) => {
    const router = new express.Router();
    const controller = controllers.chat;

    router.get('/chat', (req, res) => {
        return controller.loadChat(req, res);
    });

    // app.use('/', router);
    app.use('/', router);

    return router;
};