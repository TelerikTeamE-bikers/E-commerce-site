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

                    //  console.log(result);

                    resolve(result || null);
                }).catch((err) => {
                    //  console.log(err);
                });
        });
    }

    getAllByIds(items) {
        return new Promise((resolve, reject) => {
            const result = [];
            let itemsProcessed = 0;

            items.forEach((item) => {
                this.findById(item)
                    .then((obj) => {
                        //  result.push(obj);
                        result.push(this.factory.create(obj, this.modelClass));
                        // result.push([obj]);
                        itemsProcessed++;
                        if (itemsProcessed === items.length) {
                            //  console.log(result[0]);
                            resolve(result);
                            // Promise.all(result).then(() =>
                            //     resolve(result));
                        }
                    });
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
        const insertObject = {};

        Object.keys(model)
            .forEach((prop) => {
                insertObject[prop
                    .substring(prop.indexOf('_') + 1)] = model[prop];
            });

        return this.collection.insert(insertObject)
            .then(() => {
                return model;
            });
    }

    isValidObject(id) {
        if (!ObjectID.isValid(id)) {
            return false;
        }
        return true;
    }
}

module.exports = BaseMongoDbData; // eslint-disable-line