const passport = require('passport');
const { MongoClient, ObjectId } = require('mongodb');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const constants = require('../../common/constants');

module.exports = (app, data, errorHandler) => {
    // require('./strategies/local-strategy')();
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            //passReqToCallback: true
        },
        (email, password, done) => {
            data.user.findUserByCredentials(email, password)
                .then((user) => {
                    console.log(user);
                    if (user !== null) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'User not found' });
                    }
                }).catch((err) => {
                    console.log(err);
                    // errorHandler.handleError(req, res, err, 444);
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