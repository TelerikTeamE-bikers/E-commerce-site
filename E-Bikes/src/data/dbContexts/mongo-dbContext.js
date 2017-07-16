const { MongoClient, ObectId } = require('mongodb');
const constants = require('../../common/constants');

module.exports = {
    connectToServer() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(constants.DB_URL, function (err, db) {
                if (err) {
                    //errorHandler.handleError(err);
                    reject(err);
                } else {
                    resolve(db);
                }
            });
        });
    }
};