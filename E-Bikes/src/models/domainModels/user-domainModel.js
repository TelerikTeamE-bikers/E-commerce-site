//const crypto = require('crypto-js');
const constants = require('../../common/constants');
const cart = require('./shoppingCart-domainModel');
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

    get shoppingCart(){
        return this._shoppingCart;
    }

    get shoppingHistory(){
        return this._shoppingHistory;
    }

    addToCart(bike){
        this._shoppingCart.AddToCart(bike);
    }

    getCartTotalPrice(){
        return this._shoppingCart.totalPrice;
    }
}

module.exports = {
    getUser(username, password) {
        return new UserDomainModel(username, password);
    },
};
