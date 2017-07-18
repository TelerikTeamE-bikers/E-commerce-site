const express = require('express');
const componentLoader = require('./componentLoader');
const errorHandler = require('./errorHandler');
const fs = require('fs');
const config =
    JSON.parse(fs.readFileSync('./configuration/config.json', 'utf8'));
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

module.exports = () => {
    const app = express();

    process.env.ENV_MODE = config.Environment;

    if (process.env.ENV_MODE === 'PRODUCTION') {
        app.use('/static', express.static('build'));
    } else {
        app.use('/static', express.static('public'));
    }

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(cookieParser());
    app.use(session({ secret: 'ebikes' }));
    app.use((req, res, next) => {
        res.locals.user = req.user; // for pug calling only user
        res.locals.authenticated = req.isAuthenticated(); //todo function
        next();
    });
    require('../config/passport')(app);
    app.set('view engine', 'pug');
    app.set('views', './src/views');

    const contexts = componentLoader.initializeContexts();
    const unitOfWork = componentLoader.initializeRepositories(contexts);
    const controllers = componentLoader.initializeControllers(unitOfWork);

    componentLoader.initializeRoutes(app, controllers);
    errorHandler.handleErrors(app);

    return app;
};