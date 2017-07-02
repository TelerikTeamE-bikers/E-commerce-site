const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
//const crypto = require('crypto-js');
const constants = require('../common/constants');
const userModel = require('../models/user');
const bikeModel = require('../models/bike');

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
            if(err){
                return console.log("Failed to connect to db!!" + "\n" + err)
            }
            db.collection('bikes').insertOne({
                brand: bike.brand,
                model: bike.model,
            });

            db.close();
        });
    },
    getAllBikes() {
        MongoClient.connect(constants.DB_URL, (err, db) => {
            if (err) {
                console.log('Unable to connect to the Server', err);
            } else {
                console.log('Connection established to', url);

                var bikesCollection = db.collection('bikes');

                bikesCollection.find({}).toArray(function (err, bikeResult) {
                    let result;
                    if (err) {
                        result = err;
                    } else if (bikeResult.length) {
                        result = employeeResult;
                    } else {
                        result = 'No documents found';
                    }

                    db.close();
                    return result;
                });
            };
        });
    }
};
