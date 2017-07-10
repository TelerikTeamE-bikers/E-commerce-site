//const crypto = require('crypto-js');
const constants = require('../../common/constants');
//const validator = require('../common/validator');

class BikeDbModel {
    constructor(brand, model) {
        this._brand = brand;
        this._model = model;
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
}

module.exports = {
    getBike(brand, model) {
        return new BikeDbModel(brand, model);
    },
};
