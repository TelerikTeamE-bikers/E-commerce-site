const { ObjectID } = require('mongodb');

class BaseMongoDbData {
    constructor(contexts, ModelClass, errorHandler) {
        this.db = contexts.mongo;
        this.ModelClass = ModelClass;
        this.errorHandler = errorHandler;
        this.collectionName = this._getCollectionName();
        this.collection = this.db.collection(this.collectionName);
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

    _getCollectionName() {
        // ot kyde idva ModelClass.name ???
        return this.ModelClass.name.toLowerCase() + 's';
    }


}

module.exports = BaseMongoDbData;