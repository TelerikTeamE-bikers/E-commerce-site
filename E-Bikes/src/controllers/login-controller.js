const errorHandler = require('../components/errorHandling/errorHandler');

module.exports = function (data) {
    return {
        loadLogin(req, res) {
            res.render('login', {});
        }
    }
};