const { init } = require('../../core/engine');
const request = require('supertest');
const { expect } = require('chai');

const constants = require('../../common/constants');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('configuration/config.json', 'utf8'));
const componentLoader = require('../../core/modules/componentLoader');
const errorHandler = require('../../core/modules/errorHandler');

describe('Bike router', () => {
    let app = null;

    beforeEach(() => {
        return Promise.resolve()
            .then(() => init(config, constants, errorHandler, componentLoader))
            .then((_app) => {
                app = _app;
            });
    });

    describe('GET request', () => {
        it('/bike/allbikes expect to return 200', (done) => {
            request(app)
                .get('/bike/allbikes')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('/bike/allbikes/:id expect to return 200', (done) => {
            request(app)
                .get('/bike/allbikes?id=test')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('/bike/getBikesByFilter?:qwery expect to return 200', (done) => {
            request(app)
                .get('/bike/getBikesByFilter?qwery=test')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('/bike/getBikesByProperty?:query expect to return 200', (done) => {
            request(app)
                .get('/bike/getBikesByProperty?query=test')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });
});