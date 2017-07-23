const Bike = require('../models/dbModels/bike-dbModel');

module.exports = {

    createModel(model) {
        console.log(Bike)
        console.log("BikeType = " + Bike.name.toLowerCase())
        switch(model.name.toLowerCase()){
            case Bike.name.toLowerCase():
            return this.createBike(model);
        }
    },

    createBike(model) {
        const result = new Bike();

        Object.keys(model)
            .forEach((prop) => {
                result[prop] = model[prop];S
            });

        return result;
    },

};