const errorHandler = require('../core/errorHandler');

module.exports = function(data) {
    return {
        loadProfile(req, res) {
            res.render('myProfile', {});
        }
    }
};