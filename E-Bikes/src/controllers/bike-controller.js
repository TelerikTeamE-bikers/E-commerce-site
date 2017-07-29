const BikeModel = require('../models/dbModels/bike-dbModel');
const fs = require('fs');
const url = require('url');

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

            createTestBikes(req, res) {
                console.log('Creating new bikes...');

                const items = req.body.items;
                console.log("Items " + items);

                if (!Array.isArray(items)) {
                    return res.status(400).send('Incorrect items');
                }

                let brand = 1;
                let model = 1;
                let price = 1000

                items.forEach((item) => {
                    const newBike = new BikeModel('brand' + brand, 'model ' + model, price);
                    data.bike.create(newBike);
                    brand++;
                    model++;
                    price += 1000;
                });

                return res.status(200).send();

                // const c = fs.readFileSync('public/images/product-item.jpg',
                //     (err, c) => {
                //         if (err) {
                //             throw err;
                //         }
                //         return c;
                //     });

                // console.log(c.buffer)
                // //fs.writeFile("D:\shmatka.jpg", c)

                // const newBike = new BikeModel('brand 1', 'model 1', 1000, c.toString('base64'));

                // res.render('allBikes', {
                //     'bikeList': [newBike, newBike],
                //     user: req.user,
                // });
            },

            getBikeDetails(req, res) {
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

            getBikesByFilter(req, res) {
                console.log('Filtering bikes...');

                const urlParts = url.parse(req.url, true);
                const query = urlParts.query;

                //console.log(query.query);

                data.bike.getBikesByFilter(`${query.query}`)
                    .then((bikes) => {
                        res.render('partials/_partialAllBikes', {
                            'bikeList': bikes,
                        });
                        // console.log("result " + bikes)
                        // return res.status(200).send(`${bikes}`);
                    }).catch((err) => {
                        console.log(err);
                        return res.status(400).send(err);
                        //errorHandler.handleError(req, res, err);
                    });
            },

            getBikesByProperty(req, res) {
                const urlParts = url.parse(req.url, true);
                const query = urlParts.query.query;

                data.bike.sortBikesByProperty(query)
                    .then((bikes) => {
                        console.log(bikes);
                        res.render('partials/_partialAllBikes', {
                            'bikeList': bikes,
                        });
                    });
                console.log(query);
            },

        };
    };