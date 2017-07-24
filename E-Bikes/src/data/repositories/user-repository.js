const BaseData = require('./base/baseRepository');
const User = require('../../models/dbModels/user-dbModel');

class UsersData extends BaseData {
    constructor(dbContext, constants, factory, errorHandler) {
        super(dbContext, User, constants.USERS_COLLECTION, factory, errorHandler);
    }

    findByUsername(email) {
        return this
            .filterBy({ email: new RegExp(email, 'i') })
            .then(([user]) => user);
        // return new Promise((resolve, reject) => {
        //     // i	Case-insensitive search.
        //     this.filterBy({ username: new RegExp(username, 'i') })
        //         .then(([user]) => resolve(user));
        // });
    }
}

module.exports = UsersData;