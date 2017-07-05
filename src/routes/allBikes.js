const express = require('express');
const router = express.Router();
const bikeModel = require('../models/bike');
const data = require('../data/data');
const errorHandler = require('../errorHandling/errorHandler');

router.get('/', (req, res) => {
    console.log("all bikes page");
 
    //const bike = bikeModel.getBike('brand 1', 'model 1');
    //console.log(bike);
    //data.addBike(bike);

    //let bikes;

    data.getAllBikes(req, res).then((bikes) => {
        res.render('allBikes', {
            'bikeList': bikes
        });
    }).catch((err) => {
        errorHandler.handleError(req, res, err);
    });

    errorHandler.handleError(req, res, new Error("test error"), 500);
});

module.exports = router;