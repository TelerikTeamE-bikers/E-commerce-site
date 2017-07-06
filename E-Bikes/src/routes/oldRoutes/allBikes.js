const express = require('express');
const router = express.Router();
const bikeModel = require('../models/viewModels/bike-viewModel');
//const data = require('../data/data');
const errorHandler = require('../components/errorHandling/errorHandler');

// router.get('/', (req, res) => {
//     console.log("all bikes page");

//     //const bike = bikeModel.getBike('brand 1', 'model 1');
//     //console.log(bike);
//     //data.addBike(bike);

//     //let bikes;

//     data.getAllBikes(req, res).then((bikes) => {
//         res.render('allBikes', {
//             'bikeList': bikes
//         });
//     }).catch((err) => {
//         errorHandler.handleError(req, res, err);
//     });

//     errorHandler.handleError(req, res, new Error("test error"), 500);
// });

//module.exports = router;

module.exports = (app, data, controllers) => {
    let router = new express.Router();
    let controller = controllers.bike;

    router
        // .post('/search', controller.filterUsers)
        // .get('/admin', controller.getAdminPage)
        // .post('/admin/delete', controller.deleteUser)
        .get('/', controller.getAll);
        // .get('/bikes', (req, res) => {
        //     res.render('home', {});
        // });


    app.use('/allBikes', router);

    return router;
};