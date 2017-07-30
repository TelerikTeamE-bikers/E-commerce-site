const { assert } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../data/repositories/base/baseRepository');

describe('baseRepository.getAll()', () => {

    let actualData = [];

    let dbContext = {
        collection: () => { },
    };

    const toArray = () => {
        return Promise.resolve(actualData);
    };

    const find = (id) => {
        return {
            toArray,
        };
    };

    let factory = {
        create: (model, ModelClass) => {
            const result = new ModelClass();
            result.id = model._id;

            Object.keys(model)
                .forEach((prop) => {
                    result[prop] = model[prop];
                });

            return result;
        }
    }

    let ModelClass = null;
    let dbSetName = null;
    let errorHandler = null;

    describe('when called', () => {
        beforeEach(() => {
            actualData = [
                { id: 1, brand: 'Brand 1', model: 'Model 1', price: 1000 },
                { id: 2, brand: 'Brand 2', model: 'Model 2', price: 2000 },
                { id: 3, brand: 'Brand 3', model: 'Model 3', price: 3000 },
                { id: 4, brand: 'Brand 4', model: 'Model 4', price: 4000 },
                { id: 5, brand: 'Brand 5', model: 'Model 5', price: 5000 }];

            sinon.stub(dbContext, 'collection')
                .callsFake(() => {
                    return { find };
                });

            ModelClass = class {
            };

            dbSetName = "testDbSet"

            data = new BaseData(dbContext, ModelClass, dbSetName, factory, errorHandler);
        });

        afterEach(() => {
            dbContext.collection.restore();
        });

        it('should return array', () => {
            return data.getAll()
                .then((data) => {
                    assert.isArray(data);
                });
        });
    });

    describe('when there are items in db', () => {
        beforeEach(() => {
            actualData = [
                { id: 1, brand: 'Brand 1', model: 'Model 1', price: 1000 },
                { id: 2, brand: 'Brand 2', model: 'Model 2', price: 2000 },
                { id: 3, brand: 'Brand 3', model: 'Model 3', price: 3000 },
                { id: 4, brand: 'Brand 4', model: 'Model 4', price: 4000 },
                { id: 5, brand: 'Brand 5', model: 'Model 5', price: 5000 }];

            sinon.stub(dbContext, 'collection')
                .callsFake(() => {
                    return { find };
                });

            ModelClass = class {
            };

            dbSetName = "testDbSet"

            data = new BaseData(dbContext, ModelClass, dbSetName, factory, errorHandler);
        });

        afterEach(() => {
            dbContext.collection.restore();
        });

        it('should return items', () => {
            return data.getAll()
                .then((data) => {
                    assert.isNotEmpty(data);
                });
        });

        it('should return items of correct instance', () => {
            return data.getAll()
                .then((data) => {
                    for (let i = 0; i < data.length; i++) {
                        assert.instanceOf(data[i], ModelClass);
                    }
                });
        });

        it('should return correct data', () => {
            return data.getAll()
                .then((data) => {
                    assert.deepEqual(data, actualData);
                });
        });
    });

    describe('when there are no items in db', () => {
        beforeEach(() => {
            actualData = [];

            sinon.stub(dbContext, 'collection')
                .callsFake(() => {
                    return { find };
                });

            ModelClass = class {
            };

            dbSetName = "testDbSet"

            data = new BaseData(dbContext, ModelClass, dbSetName, factory, errorHandler);
        });

        afterEach(() => {
            dbContext.collection.restore();
        });

        it('should return empty array', () => {
            return data.getAll()
                .then((data) => {
                    assert.isEmpty(data);
                });
        });
    });
});
