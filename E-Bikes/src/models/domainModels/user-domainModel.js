const constants = require('../../common/constants');
const cart = require('./shoppingCart-domainModel');

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
        this._username = value.trim();
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value.trim().toString();
    }

    get shoppingCart() {
        return this._shoppingCart;
    }

    get shoppingHistory() {
        return this._shoppingHistory;
    }

    addToCart(bike) {
        this._shoppingCart.AddToCart(bike);
    }

    getCartTotalPrice() {
        return this._shoppingCart.totalPrice;
    }
}

module.exports = {
    getUser(username, password) {
        return new UserDomainModel(username, password);
    },
}; // eslint-disable-line