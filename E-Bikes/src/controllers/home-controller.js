const errorHandler = require('../core/errorHandler');

module.exports = function(data) {
    return {
        loadHome(req, res) {
            res.render('home', {});
        },
    };
};