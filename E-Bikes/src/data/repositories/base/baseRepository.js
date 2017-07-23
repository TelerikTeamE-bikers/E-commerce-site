const { MongoClient, ObectID } = require('mongodb');

class BaseMongoDbData {
    constructor(dbContext, modelClass, dbSetName, factory, errorHandler) {
        this.db = dbContext;
        this.modelClass = modelClass;
        this.factory = factory;
        this.errorHandler = errorHandler;
        this.dbSet = dbContext.collection(dbSetName);
    }

    getAll() {
        return new Promise((resolve, reject) => {
            this.dbSet.find()
                .toArray()
                .then((models) => {

                    let result = models.map((model) =>
                        this.factory.createModel(model, this.modelClass)
                    );

                    console.log(result);

                    resolve(result || null);
                }).catch((err) => {
                    console.log(err)
                    //errorHandler.handleError(req, res, err, 444);
                });
        });
    }

    findById(id) {
        return this.dbSet.findOne({
            _id: new ObjectID(id),
        });
    }

    filterBy(props) {
        return this.dbSet.find(props)
            .toArray();
    }

    updateById(model) {
        return this.dbSet.updateOne({
            _id: model._id,
        }, model);
    }

    // _getCollectionName() {
    //     // ot kyde idva ModelClass.name ???
    //     return this.modelClass.name.toLowerCase() + 's';
    // }


}

module.exports = BaseMongoDbData;