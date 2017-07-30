// const { assert } = require('chai');
// const sinon = require('sinon');

// const BaseData = require('../../../data/repositories/base/baseRepository');

// describe('baseRepository.getAllByIds()', () => {

//     let actualData = [];

//     let dbContext = {
//         collection: () => { },
//     };

//     const toArray = () => {
//         return Promise.resolve(actualData);
//     };

//     const find = (id) => {
//         return {
//             toArray,
//         };
//     };

//     let factory = {
//         create: (modelData, concreteClass) => { return modelData; }
//     };

//     let ModelClass = null;
//     let dbSetName = null;
//     let errorHandler = null;

//     describe('when there are items in db', () => {
//         beforeEach(() => {
//             bikes = [
//                 { id: 1, brand: 'Brand 1', model: 'Model 1', price: 1000 },
//                 { id: 2, brand: 'Brand 2', model: 'Model 2', price: 2000 },
//                 { id: 3, brand: 'Brand 3', model: 'Model 3', price: 3000 },
//                 { id: 4, brand: 'Brand 4', model: 'Model 4', price: 4000 },
//                 { id: 5, brand: 'Brand 5', model: 'Model 5', price: 5000 }];

//             sinon.stub(dbContext, 'collection')
//                 .callsFake(() => {
//                     return { find };
//                 });

//             ModelClass = class {
//             };

//             dbSetName = "testDbSet"

//             data = new BaseData(dbContext, ModelClass, dbSetName, factory, errorHandler);
//         });

//         afterEach(() => {
//             dbContext.collection.restore();
//         });

//         it('should return items', () => {
//             return data.getAll()
//                 .then((data) => {
//                     assert.exists(data);
//                 });
//         });

//         it('should return items with correct properties values types', () => {
//             return data.getAll()
//                 .then((data) => {
//                     for (let i = 0; i < actualData.length; i++) {
//                         Object.keys(data[i])
//                             .forEach((prop) => {
//                                 assert.typeOf(prop, typeof actualData[i][prop]);
//                             });
//                     }
//                 });
//         });

//         it('should return correct items with correct values', () => {
//             return data.getAll()
//                 .then((data) => {
//                     assert.deepEqual(data, actualData);
//                 });
//         });
//     });
// });
