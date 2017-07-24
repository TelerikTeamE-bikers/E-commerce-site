//const crypto = require('crypto-js');
const constants = require('../../common/constants');
//const validator = require('../common/validator');

class BikeDbModel {
    constructor(brand, model, price, picture) {
        this._brand = brand;
        this._model = model;
        this._price = price;
        this._picture = picture;
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

    get picture() {
        return this._picture;
    }

    set picture(value) {
        this._picture = value;
    }
}

module.exports = 
//{
    // getBike(brand, model, price) {
    //     return new BikeDbModel(brand, model, price);
    // },
//}
BikeDbModel
;
