const constants = require('../../common/constants');

class UserDbModel {
    constructor(id, username, password, shoppingCart, shoppingHistory) {
        this._id = id;
        this._username = username;
        this._password = password;
        this._shoppingCart = shoppingCart;
        this._shoppingHistory = shoppingHistory;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
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

    set shoppingCart(value) {
        this._shoppingCart = value;
    }

    get shoppingHistory() {
        return this._shoppingHistory;
    }

    set shoppingHistory(value) {
        this._shoppingHistory = value;
    }
}

module.exports =
    UserDbModel; // eslint-disable-line