const { MongoClient, ObectId } = require('mongodb');
const constants = require('../../common/constants');
const dataUtils = require('./../utils/data-utils');
const userDbModel = require('../../models/dbModels/user-dbModel');
const cartDbModel = require('../../models/dbModels/user-dbModel');

module.exports = {
    createUser(user) {
        let newUser = userDbModel.getUser(user.username, user.password, user.shoppingCart, user.shoppingHistory)

        MongoClient.connect(constants.DB_URL, function (err, db) {
            db.collection('users').insertOne({
                username: newUser.username,
                password: newUser.password,
                shoppingCart: newUser.shoppingCart,
                shoppingHistory: newUser.shoppingHistory
            });

            db.close();
        });
    },
    findUserByCredentials(username, password) {
        //const searchedUser = userDbModel.getUser(username, password);

        return new Promise((resolve, reject) => {
            MongoClient.connect(constants.DB_URL)
                .then((db) => {
                    db.collection('users')
                        .findOne({
                            // username: searchedUser.username,
                            // password: searchedUser.password,
                            username: username,
                            password: password,
                        })
                        .then((user) => {
                            resolve(user || null);
                        });

                    db.close();
                });
        });
    },
};