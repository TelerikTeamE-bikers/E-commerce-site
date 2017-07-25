const errorData = require('../../data/errorData');

module.exports = {
    handleError(req, res, err, customStatus) {
        res.locals.error = err;
        res.status(customStatus !== null ? customStatus : err.status);
        res.render('error');

        errorData.addError(err);
    },
    handleErrors(app) {
        //custom error handler
        app.use((req, res, next) => {
            const err = new Error('Not Found. Please verify you have entered a valid address')
            err.status = 404;
            next(err);
        });

        //error handler
        app.use((err, req, res, next) => {
            res.locals.error = err;
            res.status(err.status);
            res.render('error');
        });
    }
};