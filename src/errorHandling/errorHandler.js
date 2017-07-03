const errorData = require('../data/errorData');

module.exports = {
    handleError(req, res, err, customStatus) {
        res.locals.error = err;
        res.status(customStatus != null ? customStatus : err.status);
        res.render('error');

        errorData.addError(err);
    }
};