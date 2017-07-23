const { MongoClient, ObectId } = require('mongodb');
//const constants = require('../../common/constants');

module.exports = {
    init(connectionString) {
        // return new Promise((resolve, reject) => {
        //     MongoClient.connect(connectionString, function (err, db) {
        //         if (err) {
        //             //errorHandler.handleError(err);
        //             reject(err);
        //         } else {
        //             resolve(db);
        //         }
        //     });
        // });

        return MongoClient.connect(connectionString);
        // .then((db) => {
        //     console.log('Mongo db connected');
        //     return db;
        // });
    }
};