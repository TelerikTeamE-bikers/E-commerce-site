const { MongoClient, ObectId } = require('mongodb');

module.exports = (contexts, constants, errorHandler) => {

    let context = contexts.mongo
    return {
        findBikeById(req, res, id) {
            return new Promise((resolve, reject) => {
                context.connectToServer()
                    .then((db) => {
                        db.collection(constants.BIKES_COLLECTION)
                            .findOne({ _id: new ObjectId(id) })
                            .then((bike) => {
                                db.close();
                                resolve(bike || null);
                            }).catch((err) => {
                                console.log(err)
                                errorHandler.handleError(req, res, err, 444);
                            });
                    });
            });
        },

        addBike(req, res, bike) {
            return new Promise((resolve, reject) => {
                context.connectToServer()
                    .then((db) => {
                        db.collection(constants.BIKES_COLLECTION)
                            .insertOne({
                                brand: bike.brand,
                                model: bike.model,
                            })
                            .then(() => {
                                db.close();
                            });
                    }).catch((err) => {
                        console.log(err)
                        errorHandler.handleError(req, res, err, 444);
                    });
            });
        },

        getAllBikes(req, res, errorHandler) {
            return new Promise((resolve, reject) => {
                context.connectToServer()
                    .then((db) => {
                        db.collection(constants.BIKES_COLLECTION)
                            .find()
                            .toArray()
                            .then((bikes) => {
                                console.log(bikes);
                                db.close();
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

// addBike(bike) {
//     MongoClient.connect(constants.DB_URL, (err, db) => {
//         if (err) {
//             return console.log("Failed to connect to db!!" + "\n" + err)
//         }
//         db.collection('bikes').insertOne({
//             brand: bike.brand,
//             model: bike.model,
//         });

//         db.close();
//     });
// },