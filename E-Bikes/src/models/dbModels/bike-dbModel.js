//  const crypto = require('crypto-js');
const constants = require('../../common/constants');
//  const validator = require('../common/validator');
const fs = require('fs');

class BikeDbModel {
    constructor(brand, model, price, picturePath) {
        this._id;
        this._brand = brand;
        this._model = model;
        this._price = price;
        this._picturePath = picturePath;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
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

    get picturePath() {
        return this._picturePath;
    }

    set picturePath(value) {
        this._picturePath = value;
    }
}

module.exports =
    BikeDbModel; // eslint-disable-line