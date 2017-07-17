const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports = () => {
    passport.use(new LocalStrategy({
            usernameFiled: 'email',
            passwordField: 'password'
        },
        (username, password, done) => {
            let user = {
                username: username,
                password: password
            };
            done(null, user);
        }));
};