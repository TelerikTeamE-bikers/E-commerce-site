const BaseData = require('./base/baseRepository');
const User = require('../../models/dbModels/user-dbModel');
const { SHA256 } = require('crypto-js');

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

    findUserByCredentials(email, password) {
        return new Promise((resolve, reject) => {
            this.collection.findOne({
                email: email,
                password: SHA256(password).toString(),
            }, (err, user) => {
                if (err) {
                    return reject(err);
                }
                return resolve(user);
            });
        });
    }
    updateById(model) {
        return this.collection.findOneAndUpdate({
            _id: model._id,
        }, {
            $set: {
                email: model.email,
                address: model.address,
                phone: model.phone,
            },
        }, {
            returnOriginal: false,
        });
    }
}
module.exports = UsersData;