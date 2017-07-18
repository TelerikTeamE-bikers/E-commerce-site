const passport = require('passport');
const { MongoClient, ObjectId } = require('mongodb');
const constants = require('../common/constants');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;

module.exports = (app) => {
    // require('./strategies/local-strategy')();
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
        },
        (email, password, done) => {
            MongoClient.connect(constants.DB_URL, (err, db) => {
                console.log('TESST Local Strategy');
                db.collection('users').findOne({
                        email: email,
                    })
                    .then((user) => {
                        if (user.email.length === 0) {
                            return done(null, false, { message: ' Unknown user' });
                        }

                        console.log(user);
                        if (user.password === password) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Invalid password' });
                        }
                    });
            });
        }));

    app.use(session({
        secret: 'secret',
        saveUninitialized: true,
        resave: true,
    }));
    app.use(passport.initialize());
    app.use(passport.session());


    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        MongoClient.connect(constants.DB_URL, (err, db) => {
            db.collection('users').findOne({
                _id: new ObjectId(id),
            }).then((user) => {
                done(null, user);
            });
        });
    });
};