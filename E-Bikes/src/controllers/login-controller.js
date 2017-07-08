const errorHandler = require('../core/errorHandler');

module.exports = function (data) {
    return {
        loadLogin(req, res) {
            res.render('login', {});
        }
    }
};