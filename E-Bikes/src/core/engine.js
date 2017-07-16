const express = require('express');
const componentLoader = require('./componentLoader');
const errorHandler = require('./errorHandler');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./configuration/config.json', 'utf8'));

module.exports = () => {
    const app = express();

    process.env.ENV_MODE = config.Environment;

    if (process.env.ENV_MODE === 'PRODUCTION') {
        app.use('/static', express.static('build'));
    } else {
        app.use('/static', express.static('public'));
    }

    app.set('view engine', 'pug');
    app.set('views', './src/views');

    const unitOfWork = componentLoader.initializeRepositories();
    const controllers = componentLoader.initializeControllers(unitOfWork);

    componentLoader.initializeRoutes(app, controllers);
    errorHandler.handleErrors(app);

    return app;
};