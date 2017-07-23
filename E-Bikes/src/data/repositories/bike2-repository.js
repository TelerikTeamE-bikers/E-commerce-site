const BaseRepository = require('./base/baseRepository');
const Bike = require('../../models/dbModels/bike-dbModel');

class BikeRepository extends BaseRepository {
    constructor(dbContext, constants, errorHandler) {
        super(dbContext, Bike, constants.BIKES_COLLECTION, errorHandler);
    }
}

module.exports = BikeRepository;