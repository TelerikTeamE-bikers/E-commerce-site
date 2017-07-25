const BikeModel = require('../models/dbModels/bike-dbModel');
const fs = require('fs');

module.exports =
    function (data) {
        return {
            getAll(req, res) {
                console.log('all bikes page');

                //const bike = bikeModel.getBike('brand 1', 'model 1');
                //console.log(bike);
                //data.addBike(bike);

                data.bike.getAll()
                    .then((bikes) => {
                        res.render('allBikes', {
                            'bikeList': bikes,
                            // user: req.user,
                        });
                    }).catch((err) => {
                        console.log(err);
                        //errorHandler.handleError(req, res, err);
                    });
            },

            addBike(req, res) {
                console.log('Creating new bike');

                let c = fs.readFileSync("public/images/product-item.jpg",
                    (err, c) => {
                        if (err) {
                            throw err;
                        }
                        return c;
                    });

                console.log(c.buffer)
                //fs.writeFile("D:\kur.jpg", c)

                var newBike = new BikeModel('brand 1', 'model 1', 1000, c.toString('base64'));

                res.render('allBikes', {
                    'bikeList': [newBike, newBike],
                    user: req.user
                });
            }
        }
    }
