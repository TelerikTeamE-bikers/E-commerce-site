//const crypto = require('crypto-js');
const constants = require('../../common/constants');
const fs = require('fs');
//const validator = require('../common/validator');

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
        const c = fs.readFileSync(`${this._picturePath}`,
            (err, c) => {
                if (err) {
                    throw err;
                }
                return c;
            });

        this._picture = c.toString('base64');
    }
}

// module.exports = {
//     getBike(brand, model, price) {
//         return new BikeDomainModel(brand, model, price);
//     },
// };
module.exports = BikeDomainModel;
