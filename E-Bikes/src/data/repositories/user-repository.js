// const BaseData = require('./base/baseRepository');
// const User = require('../../models/dbModels/user-dbModel');

// class UsersData extends BaseData {
//     constructor(db) {
//         super(db, User, User);
//     }

//     findByUsername(username) {
//         return this
//             // i	Case-insensitive search.
//             .filterBy({ username: new RegExp(username, 'i') })
//             .then(([user]) => user);
//     }
// }

// module.exports = UsersData;

const { MongoClient, ObjectID } = require('mongodb');
const userDbModel = require('../../models/dbModels/user-dbModel');
const cartDbModel = require('../../models/dbModels/user-dbModel');

module.exports = (contexts, constants, errorHandler) => {

    let context = contexts.mongo
    return {
        createUser(req, res, user) {
            return new Promise((resolve, reject) => {
                context.connectToServer()
                    .then((db) => {
                        db.collection(constants.USERS_COLLECTION)
                            .insertOne({
                                username: newUser.username,
                                password: newUser.password,
                                shoppingCart: newUser.shoppingCart,
                                shoppingHistory: newUser.shoppingHistory
                            })
                            .then(() => {
                                db.close();
                            }).catch((err) => {
                                console.log(err)
                                errorHandler.handleError(req, res, err, 444);
                            });
                    });
            });
        },
        findUserByCredentials(email, password) {
            return new Promise((resolve, reject) => {
                context.connectToServer()
                    .then((db) => {
                        db.collection(constants.USERS_COLLECTION)
                            .findOne({
                                email: email,
                                password: password,
                            })
                            .then((user) => {
                                resolve(user || null);
                            }).catch((err) => {
                                console.log(err);
                                //errorHandler.handleError(req, res, err, 444);
                            });
                    });
            });
        },

        findUserById(req, res, id) {
            return new Promise((resolve, reject) => {
                context.connectToServer()
                    .then((db) => {
                        db.collection(constants.USERS_COLLECTION)
                            .findOne({ _id: new ObjectID(id) })
                            .then((user) => {
                                db.close();
                                resolve(user || null);
                            }).catch((err) => {
                                console.log(err)
                                errorHandler.handleError(req, res, err, 444);
                            });
                    });
            });
        },

        // createUser(user) {
        //     let newUser = userDbModel.getUser(user.username, user.password, user.shoppingCart, user.shoppingHistory)

        //     MongoClient.connect(constants.DB_URL, function (err, db) {
        //         db.collection('users').insertOne({
        //             username: newUser.username,
        //             password: newUser.password,
        //             shoppingCart: newUser.shoppingCart,
        //             shoppingHistory: newUser.shoppingHistory
        //         });

        //         db.close();
        //     });
        // },
        // findUserByCredentials(username, password) {
        //     //const searchedUser = userDbModel.getUser(username, password);

        //     return new Promise((resolve, reject) => {
        //         MongoClient.connect(constants.DB_URL)
        //             .then((db) => {
        //                 db.collection('users')
        //                     .findOne({
        //                         // username: searchedUser.username,
        //                         // password: searchedUser.password,
        //                         username: username,
        //                         password: password,
        //                     })
        //                     .then((user) => {
        //                         resolve(user || null);
        //                     });

        //                 db.close();
        //             });
        //     });
        // }
    };
};