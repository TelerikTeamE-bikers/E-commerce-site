const { MongoClient, ObjectID } = require('mongodb');
const { SHA256 } = require('crypto-js');

class BaseMongoDbData {
    constructor(dbContext, modelClass, dbSetName, factory, errorHandler) {
        this.db = dbContext;
        this.modelClass = modelClass;
        this.factory = factory;
        this.errorHandler = errorHandler;
        this.collection = dbContext.collection(dbSetName);
    }

    getAll() {
        return new Promise((resolve, reject) => {
            this.collection.find()
                .toArray()
                .then((models) => {
                    const result = models.map((model) =>
                        this.factory.create(model, this.modelClass)
                    );

                    //console.log(result);

                    resolve(result || null);
                }).catch((err) => {
                    console.log(err)
                    //errorHandler.handleError(req, res, err, 444);
                });
        });
    }

    getAllByIds(items) {
        return new Promise((resolve, reject) => {
            let result = [];
            let itemsProcessed = 0;

            items.forEach((item) => {
                this.findById(item)
                    .then((obj) => {
                        result.push([obj])
                        itemsProcessed++;
                        if (itemsProcessed === items.length) {
                            resolve(result);
                            // Promise.all(result).then(() =>
                            //     resolve(result));
                        }
                    })
            });
        });
    }

    findById(id) {
        return this.collection.findOne({
            _id: new ObjectID(id),
        });
    }

    filterBy(props) {
        return this.collection.find(props)
            .toArray();
    }

    updateById(model) {
        return this.collection.updateOne({
            _id: model._id,
        }, model);
    }

    create(model) {
        return this.collection.insert(model)
            .then(() => {
                return model;
            });
        // return new Promise((resolve, reject) => {
        //     this.collection.insertOne(model);
        //     resolve(model);
        // });
    }

    isValidObject(id) {
        if (!ObjectID.isValid(id)) {
            return false;
        }
        return true;
    }

    // _getCollectionName() {
    //     // ot kyde idva ModelClass.name ???
    //     return this.modelClass.name.toLowerCase() + 's';
    // }
}

module.exports = BaseMongoDbData;