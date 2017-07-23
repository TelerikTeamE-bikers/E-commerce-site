const BaseData = require('./base/baseRepository');
const User = require('../../models/dbModels/user-dbModel');

class UsersData extends BaseData {
    constructor(db) {
        super(db, User, User);
    }

    findByUsername(username) {
        return this
            // i	Case-insensitive search.
            .filterBy({ username: new RegExp(username, 'i') })
            .then(([user]) => user);
    }
}

module.exports = UsersData;