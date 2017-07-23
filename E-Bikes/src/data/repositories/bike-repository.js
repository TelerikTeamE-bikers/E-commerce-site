const BaseRepository = require('./base/baseRepository');
const Bike = require('../../models/dbModels/bike-dbModel');

class BikeRepository extends BaseRepository {
    constructor(dbContext, constants, factory, errorHandler) {
        super(dbContext, Bike, constants.BIKES_COLLECTION, factory, errorHandler);
    }
}

module.exports = BikeRepository;