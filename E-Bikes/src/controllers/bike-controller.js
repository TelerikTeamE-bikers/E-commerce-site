const BikeModel = require('../models/dbModels/bike-dbModel');
const fs = require('fs');

module.exports =
    function(data) {
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
                        });
                    }).catch((err) => {
                        console.log(err);
                        //errorHandler.handleError(req, res, err);
                    });
            },

            addBike(req, res) {
                console.log('Creating new bike');

                const c = fs.readFileSync('public/images/product-item.jpg',
                    (err, c) => {
                        if (err) {
                            throw err;
                        }
                        return c;
                    });

                console.log(c.buffer)
                    //fs.writeFile("D:\shmatka.jpg", c)

                const newBike = new BikeModel('brand 1', 'model 1', 1000, c.toString('base64'));

                res.render('allBikes', {
                    'bikeList': [newBike, newBike],
                    user: req.user,
                });
            },

            getBikeDetails(req, res, next) {
                const id = req.params.id;
                if (!data.bike.isValidObject(id)) {
                    return res.status(404).send();
                }
                data.bike.findById(id)
                    .then((bike) => {
                        if (!bike) {
                            return res.status(404).send();
                        }
                        return res.render('detailsBike', {
                            model: bike,
                        });
                    }).catch((err) => {
                        res.status(400).send(err);
                    });
            },
        };
    };