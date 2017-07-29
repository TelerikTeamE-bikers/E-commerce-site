const BaseRepository = require('./base/baseRepository');
const Bike = require('../../models/dbModels/bike-dbModel');

class BikeRepository extends BaseRepository {
    constructor(dbContext, constants, factory, errorHandler) {
        super(dbContext, Bike, constants.BIKES_COLLECTION, factory, errorHandler);
    }

    getBikesByFilter(query) {
        // return new Promise((resolve, reject) => {
        //     console.log("query " + query)

        //     this.filterBy({ brand: query})
        //         //.toArray()
        //         .then((models) => {
        //             console.log("db")
        //             console.log(models)
        //             const result = models.map((model) => 
        //                 this.factory.create(model, Bike)
        //             );

        //             console.log("after factory: " + result);

        //             resolve(result || null);
        //         }).catch((err) => {
        //             console.log(err)
        //         });
        // });


        return new Promise((resolve, reject) => {
            params = query.split(' ');

            console.log(params)

            params.forEach((element) => {
                
            });
            
            db.inventory.find( { $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] } )

            this.filterBy({ brand: query})
                //.toArray()
                .then((models) => {
                    console.log("db")
                    console.log(models)
                    const result = models.map((model) => 
                        this.factory.create(model, Bike)
                    );

                    console.log("after factory: " + result);

                    resolve(result || null);
                }).catch((err) => {
                    console.log(err)
                });
        });
    }
}

module.exports = BikeRepository;