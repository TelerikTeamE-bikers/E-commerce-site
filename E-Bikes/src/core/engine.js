const express = require('express');
//const componentLoader = require('./componentLoader');
//const errorHandler = require('./errorHandler');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
//const constants = require('../../common/constants');

module.exports = (config, constants, errorHandler, componentLoader) => {
    const app = express();

    process.env.ENV_MODE = config.Environment;

    if (process.env.ENV_MODE === 'PRODUCTION') {
        app.use('/static', express.static('build'));
    } else {
        app.use('/static', express.static('public'));
    }

    app.use(
        bodyParser.urlencoded({
            extended: true
        })
    );
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(
        session({
            secret: 'ebikes',
            resave: true,
            saveUninitialized: true
        })
    );

    app.use((req, res, next) => {
        res.locals.user = req.user; // for pug calling only user
        res.locals.authenticated = req.isAuthenticated(); //todo function
        next();
    });
    require('../config/passport')(app);
    app.set('view engine', 'pug');
    app.set('views', './src/views');

    const contexts = componentLoader.initializeContexts();
    const unitOfWork = componentLoader.initializeRepositories(contexts, constants, errorHandler);
    const controllers = componentLoader.initializeControllers(unitOfWork);
    componentLoader.initializeRoutes(app, controllers);

    errorHandler.handleErrors(app);

    return app;
};