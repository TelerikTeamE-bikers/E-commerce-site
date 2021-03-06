const BaseData = require('./base/baseRepository');
const User = require('../../models/dbModels/user-dbModel');
const { SHA256 } = require('crypto-js');

class UsersData extends BaseData {
    constructor(dbContext, constants, factory, errorHandler) {
        super(
            dbContext, User, constants.USERS_COLLECTION, factory, errorHandler
        );
    }

    findByUsername(email) {
        return this
            .filterBy({ email: new RegExp(email, 'i') })
            .then(([user]) => user);
    }

    findUserByCredentials(email, password) {
        return new Promise((resolve, reject) => {
            this.collection.findOne({
                email: email,
                password: new SHA256(password).toString(),
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
                name: model.name,
            },
        }, {
            returnOriginal: false,
        });
    }
    addItemsToOrdersHistory(userId, items) {
        items.forEach((item) => {
            this.collection
                .update({ _id: userId }, {
                    $push: {
                        ordersHistory: item._id.toString(),
                    },
                });
        });
        return Promise.resolve(items);
    }
}
module.exports = UsersData; // eslint-disable-line