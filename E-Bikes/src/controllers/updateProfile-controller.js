const errorHandler = require('../core/errorHandler');

module.exports = function(data) {
    return {
        loadupdateProfile(req, res) {
            res.render('updateProfile', {});
        }
    }
};