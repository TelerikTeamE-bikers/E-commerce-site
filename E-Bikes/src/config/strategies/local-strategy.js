const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { MongoClient } = require('mongodb');
const constants = require('../../common/constants');

module.exports = () => {
    passport.use(new LocalStrategy(
        (email, password, done) => {

            MongoClient.connect(constants.DB_URL, (err, db) => {
                console.log('TESST Local Strategy');
                db.collection('users').findOne({
                        email: email
                    }).toArray()
                    .then((user) => {
                        console.log(user);
                        if (user.length === 0) {
                            return done(null, false, { message: ' Unknown user' });
                        }
                        if (user[0].password === password) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Invalid password' });
                        }
                    })
            });
        }));
};

// (err, results) => {
//     if (results.passwords === password) {
//         const user = results;
//         done(null, user);
//     } else {
//         done('Bad password');
//     }
// }