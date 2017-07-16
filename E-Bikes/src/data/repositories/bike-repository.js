const { MongoClient, ObectId } = require('mongodb');
//const crypto = require('crypto-js');
const constants = require('../../common/constants');
const userModel = require('../../models/viewModels/user-viewModel');
const bikeModel = require('../../models/viewModels/bike-viewModel');
const errorHandler = require('../../core/errorHandler');
//const mongo = require('../mongoDbContext');

module.exports = (contexts) => {
    let context = contexts.mongo
    return {
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
        getAllBikes(req, res, errorHandler) {
            return new Promise((resolve, reject) => {
                context.connectToServer()
                    .then((db) => {
                        db.collection('bikes')
                            .find()
                            .toArray()
                            .then((bikes) => {
                                console.log(bikes)

                                resolve(bikes || null);
                            })
                    }).catch((err) => {
                        console.log(err)
                        errorHandler.handleError(req, res, err, 444);
                    });
            });
        }
    }
};
