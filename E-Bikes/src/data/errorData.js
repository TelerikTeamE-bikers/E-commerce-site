const { MongoClient, ObectId } = require('mongodb');
//const crypto = require('crypto-js');
const constants = require('../common/constants');
const errorModel = require('../models/domainModels/error-domainModel');

module.exports = {
      addError(error) {
        var newError = errorModel.getError(error);

        MongoClient.connect(constants.DB_URL, (err, db) => {
            if (err) {
                return console.log("Failed to connect to db!!" + "\n" + err)
            }
            db.collection('errors').insertOne({
                error: newError.content,
                creeatedOn: newError.createdOn,
            });

            db.close();
        });

        console.log('New error saved! \n', newError);
    },
}