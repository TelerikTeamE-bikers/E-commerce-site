const { init } = require('../../core/engine');
const request = require('supertest');
const { expect } = require('chai');

const constants = require('../../common/constants');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('configuration/config.json', 'utf8'));
const componentLoader = require('../../core/modules/componentLoader');
const errorHandler = require('../../core/modules/errorHandler');
let chance = require('chance').Chance();
const randomEmail = chance.email({ domain: 'example.com' });
const constPass = 'dce1333';
describe('Auth router', () => {
    let app = null;

    beforeEach(() => {
        return Promise.resolve()
            .then(() => init(config, constants, errorHandler, componentLoader))
            .then((_app) => {
                app = _app;
            });
    });
    describe('GET /auth/signup', () => {
        it('should return signup form', (done) => {
            request(app)
                .get('/auth/signup')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('POST /auth/signup', () => {
        describe('Success', () => {
            it('should register new user and redirects to /auth/login', (done) => {
                const user = {
                    email: randomEmail,
                    password: constPass,
                    password_repeat: constPass,
                };
                request(app)
                    .post('/auth/signup')
                    .send({
                        email: user.email,
                        password: user.password,
                        password_repeat: user.password_repeat,
                    })
                    .expect(302)
                    .expect('Location', '/auth/login')
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }
                        // res.body.email.to.equal('peter_85@abv.bg');
                        return done();
                    });
            });
        });
        describe('Failure', () => {
            it('should not register the user and redirects to /auth/login', (done) => {
                const user = {
                    email: randomEmail + 'test',
                    password: 'fce1338',
                    password_repeat: 'fce13382',
                };
                request(app)
                    .post('/auth/signup')
                    .send({
                        email: user.email,
                        password: user.password,
                        password_repeat: user.password_repeat,
                    })
                    .expect(302)
                    .expect('Location', '/auth/login')
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }
                        return done();
                    });
            });
        });
    });

    describe('GET /auth/login', () => {
        it('should return login form', (done) => {
            request(app)
                .get('/auth/login')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('POST /auth/login', () => {
        describe('Success', () => {
            it('should login the user and redirects to /auth/myProfile', (done) => {
                const user = {
                    email: randomEmail,
                    password: constPass,
                };
                request(app)
                    .post('/auth/login')
                    .send({
                        email: user.email,
                        password: user.password,
                    })
                    .expect(302)
                    .expect('Location', '/auth/myProfile')
                    // .expect((res) => {
                    //     expect(res.body.email).to.equal(user.email);
                    // })
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }
                        return done();
                    });
            });
        });
        describe('Failure', () => {
            it('should not login the user and redirects to /auth/login', (done) => {
                const user = {
                    email: 'peter_85@abv.bg',
                    password: 'fce1338',
                };
                request(app)
                    .post('/auth/login')
                    .send({
                        email: user.email,
                        password: user.password,
                    })
                    .expect(302)
                    .expect('Location', '/auth/login')
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }
                        return done();
                    });
            });
        });
    });
});