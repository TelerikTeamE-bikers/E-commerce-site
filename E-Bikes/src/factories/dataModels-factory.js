const Bike = require('../models/dbModels/bike-dbModel');
const User = require('../models/dbModels/user-dbModel');

module.exports = {

    createModel(model, modelClass) {
        switch (modelClass.name.toLowerCase()) {
            case Bike.name.toLowerCase():
                //  return this.createBike(model);
                return this.create(model, modelClass);
            case User.name.toLowerCase():
                //  return this.createUser(model);
                return this.create(model, modelClass);
        }
    },

    create(model, ModelClass) {
        const result = new ModelClass();
        result.id = model._id;

        Object.keys(model)
            .forEach((prop) => {
                result[prop] = model[prop];
            });

        return result;
    },

    createBike(model) {
        const result = new Bike(
            model.brand,
            model.model,
            model.price,
            model.picture
        );

        result.id = model._id;

        return result;
    },

    createUser(model) {
        const result = new User();

        Object.keys(model)
            .forEach((prop) => {
                result[prop] = model[prop];
            });

        return result;
    },
}; // eslint-disable-line