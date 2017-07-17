const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { MongoClient } = require('mongodb');
const constants = require('../../common/constants');

module.exports = () => {
    passport.use(new LocalStrategy({
            usernameFiled: 'email',
            passwordField: 'password'
        },
        (username, password, done) => {

            MongoClient.connect(constants.DB_URL, (err, db) => {
                db.collection('users').findOne({
                        email: username
                    },
                    (err, results) => {
                        if (results.passwords === password) {
                            const user = results;
                            done(null, user);
                        } else {
                            done('Bad password');
                        }

                    }
                )
            });
        }));
};