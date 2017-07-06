const errorHandler = require('../components/errorHandling/errorHandler');

module.exports = function (data) {
    return {
        loadSignup(req, res) {
            res.render('signup', {});
        }
    }
};