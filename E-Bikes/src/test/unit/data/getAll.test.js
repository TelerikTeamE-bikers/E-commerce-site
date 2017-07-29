const { expect } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../data/repositories/base/baseRepository');

describe('BaseData.getAll()', () => {
    // const db = {
    //     collection: () => { },
    // };
    // let items = [];

    // let ModelClass = null;
    // const validator = null;
    // let data = null;

    // const toArray = () => {
    //     return Promise.resolve(items);
    // };

    // const find = () => {
    //     return {
    //         toArray,
    //     };
    // };

    let bikes = [];

    let dbContext = {
        collection: () => { },
    };

    const toArray = () => {
        return Promise.resolve(bikes);
    };

    const find = (id) => {
        return {
            toArray,
        };
    };

    let ModelClass = null;
    let dbSetName = null;
    let factory = null;
    let errorHandler = null;


    describe('when there are items in db', () => {
        describe('with default toViewModel', () => {
            beforeEach(() => {
                bikes = [{ id: 1, brand: 'Brand 1', model: 'Model 1', price: 1000 },
                { id: 1, brand: 'Brand 1', model: 'Model 1', price: 1000 }];

                sinon.stub(dbContext, 'collection')
                    .callsFake(() => {
                        return { find };
                    });

                ModelClass = class {
                };

                dbSetName = "bikes"

                factory = require('../../../factories/dataModels-factory');
                
                // Arrange
                //data = new BaseData(db, ModelClass, validator);
                data = new BaseData(dbContext, ModelClass, dbSetName, factory, errorHandler);
            });

            afterEach(() => {
                dbContext.collection.restore();
            });

            it('expect to return items', () => {
                return data.getAll()
                    .then((models) => {
                        expect(models).to.deep.equal(bikes);
                    });
            });
        });

        // describe('with custom toViewModel', () => {
        //     beforeEach(() => {
        //         items = [1, 2, 3, 4];
        //         sinon.stub(db, 'collection')
        //             .callsFake(() => {
        //                 return { find };
        //             });
        //         ModelClass.toViewModel = (model) => {
        //             return model + '1';
        //         };

        //         // Arrange
        //         data = new BaseData(db, ModelClass, validator);
        //     });

        //     afterEach(() => {
        //         db.collection.restore();
        //     });

        //     it('expect to return items', () => {
        //         return data.getAll()
        //             .then((models) => {
        //                 items.forEach((item) => {
        //                     const viewModel = item + '1';
        //                     expect(models).to.contain(viewModel);
        //                 });
        //             });
        //     });
        // });
    });
});
