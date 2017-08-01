const { MongoClient, ObectId } = require('mongodb');
module.exports = {
    init(connectionString) {
        return MongoClient.connect(connectionString);
    },
}; // eslint-disable-line