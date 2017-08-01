const constants = require('../../common/constants');

class ShoppingCartDomainModel {
    constructor() {
        this._bikes = [];
        this._tottalPrice = 0;
    }

    AddToCart(bike) {
        this._bikes.push(bike);
        this._tottalPrice += bike.price;
    }

    get bikes() {
        return this._bikes;
    }

    get totalPrice() {
        return this._tottalPrice;
    }
}

module.exports = {
    getCart() {
        return new ShoppingCartDomainModel();
    },
}; // eslint-disable-line