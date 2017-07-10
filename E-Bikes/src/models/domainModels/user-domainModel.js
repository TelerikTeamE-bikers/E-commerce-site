//const crypto = require('crypto-js');
const constants = require('../../common/constants');
const cart = require('../domainModels/cart-domainModel');
//const validator = require('../common/validator');

class UserDomainModel {
    constructor(username, password) {
        this._username = username;
        this._password = password;
        this._shoppingCart = cart.getCart();
        this._shoppingHistory = [];
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

    AddToCart(bike){
        this._shoppingCart.AddToCart(bike);
    }
}

module.exports = {
    getUser(username, password) {
        return new UserDomainModel(username, password);
    },
};
