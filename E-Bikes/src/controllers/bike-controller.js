const BikeModel = require('../models/dbModels/bike-dbModel');
const fs = require('fs');
const url = require('url');

module.exports =
    function(data, factories, constants, errorHandler) {
        return {
            getAll(req, res) {
                console.log('all bikes page');

                data.bike.getAll()
                    .then((dbBikes) => {
                        let domainBikes = [];

                        dbBikes.forEach((bike) => {
                            let domBike = factories.domainModels.createBike(bike);
                            domBike.initPictureValue();
                            domainBikes.push(domBike);
                        });

                        return domainBikes;
                    })
                    .then((viewBikes) => {
                        res.render('allBikes', {
                            'bikeList': viewBikes,
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


                let brand = 1;
                let model = 1;
                let price = 1000;
                let picture = 1;

                for (let i = 0; i < items; i++) {
                    if (picture > 6) {
                        picture = 1;
                    }
                    const newBike = new BikeModel(
                        'brand' + brand,
                        'model ' + model,
                        price,
                        `public/images/bikes/${picture.toString()}.jpg`
                    );

                    data.bike.create(newBike);

                    brand++;
                    model++;
                    price += 1000;
                    picture++;
                }

                return res.status(200).send();
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

                data.bike.getBikesByFilter(`${query.query}`)
                    .then((dbBikes) => {
                        const domainBikes = [];

                        dbBikes.forEach((bike) => {
                            const domBike = factories.domainModels.createBike(bike);
                            domBike.initPictureValue();
                            domainBikes.push(domBike);
                        });

                        return domainBikes;
                    })
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
                    .then((dbBikes) => {
                        const domainBikes = [];

                        dbBikes.forEach((bike) => {
                            const domBike = factories.domainModels.createBike(bike);
                            domBike.initPictureValue();
                            domainBikes.push(domBike);
                        });

                        return domainBikes;
                    })
                    .then((viewBikes) => {
                        res.render('partials/_partialAllBikes', {
                            'bikeList': viewBikes,
                        });
                    });
                console.log(query);
            },

        };
    };