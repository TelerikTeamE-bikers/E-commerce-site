const errorHandler = require('../core/errorHandler');

module.exports = function (data) {
    return {
        loadSignup(req, res) {
            res.render('signup', {});
        }
    }
};