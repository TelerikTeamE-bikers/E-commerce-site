const errorHandler = require('../components/errorHandling/errorHandler');

module.exports = function (data) {
    return {
        loadSpareParts(req, res) {
            res.render('spareParts', {});
        }
    }
};