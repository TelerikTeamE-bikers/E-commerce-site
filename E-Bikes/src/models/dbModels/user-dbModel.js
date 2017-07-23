//const crypto = require('crypto-js');
const constants = require('../../common/constants');
//const validator = require('../common/validator');

class UserDbModel {
    constructor(username, password, shoppingCart, shoppingHistory) {
        this.username = username;
        this.password = password;
        this._shoppingCart = shoppingCart;
        this._shoppingHistory = shoppingHistory;
    }

    get username() {
        return this._username;
    }

    set username(value) {
        // validator.validateStringLength(value,
        //     constants.MIN_USERNAME_LENGTH, constants.MAX_USERNAME_LENGTH);

        this._username = value.trim();
    }

    get password() {
        return this._password;
    }

    set password(value) {
        // validator.validateStringLength(value,
        //     constants.MIN_PASSWORD_LENGTH, constants.MAX_PASSWORD_LENGTH);

        //this._password = new crypto.SHA1(value.trim()).toString();
        this._password = value.trim().toString();
    }

    get shoppingCart() {
        return this._shoppingCart;
    }

    set shoppingCart(value) {
        this._shoppingCart = value;
    }

    get shoppingHistory(){
        return this._shoppingHistory;
    }

    set shoppingHistory(value) {
        this._shoppingHistory = value;
    }
}

module.exports =
//  {
//     getUser(username, password, shoppingCart, shoppingHistory) {
//         return new UserDbModel(username, password, shoppingCart, shoppingHistory);
//     },
// };

UserDbModel;
