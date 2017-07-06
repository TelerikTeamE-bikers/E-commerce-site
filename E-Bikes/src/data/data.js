const { MongoClient, ObectId } = require('mongodb');
//const crypto = require('crypto-js');
const constants = require('../common/constants');
const userModel = require('../models/viewModels/user-viewModel');
const bikeModel = require('../models/viewModels/bike-viewModel');
const errorHandler = require('../components/errorHandling/errorHandler');

module.exports = {
    // findUserById(id) {
    //     return new Promise((resolve, reject) => {
    //         MongoClient.connect(constants.DB_URL)
    //             .then((db) => {
    //                 db.collection('users')
    //                     .findOne({ _id: new ObjectId(id) })
    //                     .then((user) => {
    //                         resolve(user || null);
    //                     });

    //                 db.close();
    //             });
    //     });
    // },
    // findUserByCredentials(username, password) {
    //     const searchedUser = userModel.getUser(username, password);

    //     return new Promise((resolve, reject) => {
    //         MongoClient.connect(constants.DB_URL)
    //             .then((db) => {
    //                 db.collection('users')
    //                     .findOne({
    //                         username: searchedUser.username,
    //                         password: searchedUser.password,
    //                     })
    //                     .then((user) => {
    //                         resolve(user || null);
    //                     });

    //                 db.close();
    //             });
    //     });
    // },
    // addUser(user) {
    //     MongoClient.connect(constants.DB_URL, function(err, db) {
    //         db.collection('users').insertOne({
    //             username: user.username,
    //             password: user.password,
    //         });

    //         db.close();
    //     });
    // },
    addBike(bike) {
        MongoClient.connect(constants.DB_URL, (err, db) => {
            if (err) {
                return console.log("Failed to connect to db!!" + "\n" + err)
            }
            db.collection('bikes').insertOne({
                brand: bike.brand,
                model: bike.model,
            });

            db.close();
        });
    },
    getAllBikes(req, res) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(constants.DB_URL)
                .then((db) => {
                    db.collection('bikes')
                        .find()
                        .toArray()
                        .then((bikes) => {
                            resolve(bikes || null);
                        })

                    db.close();
                })
                .catch((err) => {
                    console.log('Unable to connect to the Server', err);
                    errorHandler.handleError(req, res, err, 444);
                });
        });
    }
};
