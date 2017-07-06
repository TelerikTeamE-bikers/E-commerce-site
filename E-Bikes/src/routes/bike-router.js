const express = require('express');
//const router = express.Router();

module.exports = (app, controllers) => {
    let router = new express.Router();
    let controller = controllers.bike;

    router
        .get('/', (req, res) => {
            res.send('It works!');
        })
        // .post('/search', controller.filterUsers)
        // .get('/admin', controller.getAdminPage)
        // .post('/admin/delete', controller.deleteUser)
        .get('/allbikes', controller.getAll);

    app.use('/bike', router);

    return router;
};