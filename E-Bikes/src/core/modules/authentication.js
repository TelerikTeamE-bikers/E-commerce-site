const passport = require('passport');
const { MongoClient, ObjectId } = require('mongodb');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const constants = require('../../common/constants');

module.exports = (app, data, errorHandler) => {
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
        },
        (email, password, done) => {
            data.user.findUserByCredentials(email, password)
                .then((user) => {
                    if (user !== null) {
                        return done(null, user);
                    }
                    return done(null,
                        false, { message: 'User not found or wrong password' });
                }).catch((err) => {
                    console.log(err);
                });
        }));

    app.use(passport.initialize());
    app.use(passport.session());

    // If authentication succeeds, a session will be established and maintained
    // via a cookie set in the user's browser.
    // Each subsequent request will not contain
    // credentials, but rather the unique
    // cookie that identifies the session. In order to support login sessions,
    // Passport will serialize and deserialize
    // user instances to and from the session.

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        data.user.findById(id)
            .then((user) => {
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch((error) => done(error, false));
    });
}; // eslint-disable-line