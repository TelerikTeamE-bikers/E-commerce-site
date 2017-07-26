/* globals process */

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const async = () => {
    return Promise.resolve();
};

module.exports = {
    init(config, constants, errorHandler, componentLoader) {
        return new Promise((resolve, reject) => {
            const app = express();

            async()
            .then(() => {
                    process.env.ENV_MODE = config.Environment;

                    if (process.env.ENV_MODE === 'PRODUCTION') {
                        app.use('/static', express.static('build'));
                    } else {
                        app.use('/static', express.static('public'));
                    }

                    app.use(
                        bodyParser.urlencoded({
                            extended: true,
                        })
                    );
                    app.use(bodyParser.json());
                    app.use(cookieParser());
                    // //we use it in authentication-module
                    app.use(
                        session({
                            secret: 'ebikes',
                            resave: true,
                            saveUninitialized: true,
                        })
                    );
                    app.use(require('connect-flash')());
                    app.use((req, res, next) => {
                        res.locals.messages = require('express-messages')(req, res);
                        next();
                    });
                })
                .then(() => componentLoader.initializeContexts(constants))
                .then((contexts) => contexts.mongo.init(constants.DB_URL))
                .then((context) => {
                    const factories = componentLoader.initializeFactories(constants);
                    const data = componentLoader.initializeRepositories(context,
                        constants,
                        factories.dataModels,
                        errorHandler);

                    return {data: data, factories: factories};
                })
                .then((result) => {
                    //app.use(flash())
                    require('./modules/authentication')(app, result.data, errorHandler);

                    app.use((req, res, next) => {
                        res.locals.user = req.user; // for pug calling only user
                        res.locals.authenticated = req.isAuthenticated();
                        // console.log(req.isAuthenticated());
                        next();
                    });

                    app.set('view engine', 'pug');
                    app.set('views', './src/views');

                    const controllers = componentLoader
                        .initializeControllers(result.data, result.factories, constants, errorHandler);
                    componentLoader.initializeRoutes(app, controllers);

                    //errorHandler.handleErrors(app);

                    resolve(app);
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    }
};