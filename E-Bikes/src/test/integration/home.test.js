const { init } = require('../../core/engine');
const request = require('supertest');
const { expect } = require('chai');

// // next lines are from Doncho presentation - how to adopted for our project
// describe('/items tests', () => {
//     const connectionString = 'mongodb://localhost/items-db-test';
//     let app = null;

//     beforeEach(() => {
//         return Promise.resolve()
//             .then(() => require('../../db').init(connectionString))
//             .then((db) => require('../../data').init(db))
//             .then((data) => require('../../app').init(data))
//             .then((_app) => {
//                 app = _app;
//             });
//     });

//     describe('GET /item', () => {
//         it('expect to return 200', (done) => {
//             request(app)
//                 .get('/items')
//                 .expect(200)
//                 .end((err, res) => {
//                     if (err) {
//                         return done(err);
//                     }

//                     return done();
//                 });
//         });
//     });
// });