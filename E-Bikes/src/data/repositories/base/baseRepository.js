const { MongoClient, ObectID } = require('mongodb');

class BaseMongoDbData {
    constructor(dbContext, modelClass, dbSetName, errorHandler) {
        this.db = dbContext;
        this.modelClass = modelClass;
        this.errorHandler = errorHandler;
        this.dbSet = dbContext.collection(dbSetName);
    }

    getAll() {
        // console.log("db = " + this.db)
        // console.log()


        return new Promise((resolve, reject) => {
         this.dbSet.find()
            .toArray()
            .then((models) => {

                // if (this.modelClass.toViewModel) {
                //     return models.map(
                //         (model) => this.modelClass.toViewModel(model)
                //     );
                // }

                resolve(models || null);
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