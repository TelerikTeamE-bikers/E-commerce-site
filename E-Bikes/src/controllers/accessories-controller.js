const errorHandler = require('../core/errorHandler');

module.exports = function(data) {
    return {
        loadAccessories(req, res) {
            res.render('accessories', {});
        }
    }
};