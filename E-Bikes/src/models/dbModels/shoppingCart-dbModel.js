const constants = require('../../common/constants');

class ShoppingCartDomainModel {
    constructor(bikes, totalPrice) {
        this._bikes = bikes;
        this._tottalPrice = totalPrice;
    }

    get bikes() {
        return this._bikes;
    }

    set bikes(value) {
        this._bikes = value;
    }

    get totalPrice() {
        return this._tottalPrice;
    }

    set totalPrice(value) {
        this._tottalPrice = tottalPrice;
    }
}

module.exports = {
    getCart(bikes, totalPrice) {
        return new ShoppingCartDomainModel(bikes, totalPrice);
    },
}; // eslint-disable-line