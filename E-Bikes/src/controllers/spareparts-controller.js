const errorHandler = require('../core/errorHandler');

module.exports = function (data) {
    return {
        loadSpareParts(req, res) {
            res.render('spareParts', {});
        }
    }
};