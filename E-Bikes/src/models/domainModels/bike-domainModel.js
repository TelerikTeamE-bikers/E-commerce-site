//const crypto = require('crypto-js');
const constants = require('../../common/constants');

//const validator = require('../common/validator');

class BikeDomainModel {
    constructor(brand, model, price) {
        this._brand = brand;
        this._model = model;
        this._price = price;
    }

    get brand() {
        return this._brand;
    }

    set brand(value) {
        this._brand = value;
    }

    get model() {
        return this._model;
    }

    set model(value) {
        this._model = value;
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
        return new BikeDomainModel(brand, model, price);
    },
};
