const errorHandler = require('../components/errorHandling/errorHandler');

module.exports = function (data) {
    return {
        loadAccessories(req, res) {
            res.render('accessories', {});
        }
    }
};