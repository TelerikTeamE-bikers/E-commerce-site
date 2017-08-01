const constants = require('../../common/constants');
const fs = require('fs');

class BikeDomainModel {
    constructor(brand, model, price, picturePath) {
        this._id;
        this._brand = brand;
        this._model = model;
        this._price = price;
        this._picturePath = picturePath;
        this._picture = '';
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

    get picture() {
        return this._picture;
    }

    set picture(value) {
        this._picture = value;
    }

    initPictureValue() {
        this._picture = this._picturePath;
    }
}

module.exports = BikeDomainModel; // eslint-disable-line