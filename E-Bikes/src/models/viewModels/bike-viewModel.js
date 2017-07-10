class BikeViewModel {
    constructor(brand, model) {
        this._brand = brand;
        this._model = model;
    }

    get brand() {
        return this._brand;
    }

    set brand(value) {
        this._brand = value.trim();
    }

    get model() {
        return this._model;
    }

    set model(value) {
        this._model = value.trim().toString();
    }
}

module.exports = {
    getBike(brand, model) {
        return new BikeViewModel(brand, model);
    },
};
