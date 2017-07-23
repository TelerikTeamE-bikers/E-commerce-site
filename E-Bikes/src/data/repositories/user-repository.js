const BaseData = require('./base/baseRepository');
const User = require('../../models/dbModels/user-dbModel');

class UsersData extends BaseData {
    constructor(dbContext, constants, factory, errorHandler) {
        super(dbContext, User, constants.BIKES_COLLECTION, factory, errorHandler);
    }

    findByUsername(username) {
        return this
            // i	Case-insensitive search.
            .filterBy({ username: new RegExp(username, 'i') })
            .then(([user]) => user);
    }
}

module.exports = UsersData;