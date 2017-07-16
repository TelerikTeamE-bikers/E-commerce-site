const express = require('express');
const constants = require('../common/constants');
const componentLoader = require('./componentLoader');
const errorHandler = require('./errorHandler');
const fs = require('fs');

module.exports = function(data) {
    const app = express();
    app.set('view engine', 'pug');


    const config = JSON.parse(fs.readFileSync('./configuration/config.json', 'utf8'));
    process.env.ENV_MODE = config.Environment;

    if (process.env.ENV_MODE === 'PRODUCTION') {
        app.use('/static', express.static('build'));
    } else {
        app.use('/static', express.static('public'));
    }

    app.set('views', './src/views');


    const unitOfWork = componentLoader.initializeRepositories();
    const controllers = componentLoader.initializeControllers(unitOfWork);

    componentLoader.initializeRoutes(app, controllers);

    errorHandler.handleErrors(app);

    // app.get('/', (req, res) => { // using PUG
    //     res.send(homeController.loadHome);
    // });

    /*app.get('/404', (req, res) => {
        res.status(404).send({
            error: 'Page not found.',
            name: 'Todo App v1.0',
        });
    });*/

    //custom error handler
    // app.use((req, res, next) => {
    //     const err = new Error('Not Found. Please verify you have entered a valid address')
    //     err.status = 404;
    //     next(err);
    // });

    // //error handler
    // app.use((err, req, res, next) => {
    //     res.locals.error = err;
    //     res.status(err.status);
    //     res.render('error');
    // });

    return app;
};