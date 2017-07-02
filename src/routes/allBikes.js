const express = require('express');
const router = express.Router();
const bikeModel = require('../models/bike');
const data = require('../data/data');

router.get('/', (req, res) => {
    console.log("all bikes page");
    
    const bike = bikeModel.getBike('brand 1', 'model 1');
    console.log(bike);
    data.addBike(bike);

    let bikes = data.getAllBikes();
    console.log("testbikes: " + bikes)

    res.render('allBikes', {
        //bikeList: 'bikeList'
        //'bikeList': bikes
    });

    // MongoClient.connect(url, function(err, db) {
    // if (err) {
    //     console.log('Unable to connect to the Server', err);
    // } else {
    //     console.log('Connection established to', url);

    //     var employeecollection = db.collection('employees');

    //     // Find all employees
    //     employeecollection.find({}).toArray(function(err, employeeResult) {
    //         if (err) {
    //             res.send(err);
    //         } else if (employeeResult.length) {
    //             res.render('employeelist', {
    //                 'employeelist': employeeResult,
    //             });
    //         } else {
    //             res.send('No documents found');
    //         }
    //         db.close();
    //     });
    // };

});

module.exports = router;