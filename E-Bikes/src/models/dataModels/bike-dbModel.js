//const crypto = require('crypto-js');
const constants = require('../../common/constants');
//const validator = require('../common/validator');

class BikeDbModel {
    constructor(brand, model, price) {
        this._brand = brand;
        this._model = model;
        this._price = price;
    }

    get brand() {
        return this._brand;
    }

    set brand(value) {
        // validator.validateStringLength(value,
        //     constants.MIN_USERNAME_LENGTH, constants.MAX_USERNAME_LENGTH);

        this._brand = value.trim();
    }

    get model() {
        return this._model;
    }

    set model(value) {
        // validator.validateStringLength(value,
        //     constants.MIN_PASSWORD_LENGTH, constants.MAX_PASSWORD_LENGTH);

        //this._password = new crypto.SHA1(value.trim()).toString();
        this._model = value.trim().toString();
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }
}

module.exports = {
    getBike(brand, model, price) {
        return new BikeDbModel(brand, model, price);
    },
};
