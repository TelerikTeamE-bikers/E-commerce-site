const express = require('express');
const constants = require('../common/constants');

const mainRoutes = require('../routes');
const allBikesRoutes = require('../routes/allBikes.js');
const sparePartsRoutes = require('../routes/spareParts.js');
const accessoriesRoutes = require('../routes/accessories.js');
const loginRoutes = require('../routes/login.js');
const signupRoutes = require('../routes/signup.js');

module.exports = function (data) {

    let app = express();
    app.set('view engine', 'pug');

    var fs = require('fs');
    var config = JSON.parse(fs.readFileSync('./configuration/config.json', 'utf8'));
    process.env.ENV_MODE = config.Environment;

    if (process.env.ENV_MODE === 'PRODUCTION') {
        app.use('/static', express.static('build'));
    } else {
        app.use('/static', express.static('public'));
    }

    // const homeController = require('./src/controllers/home-controller'); // Not sure how to use it yet
    //const bikeController = require('./src/controllers/bike-controller');

    //app.use(express.static(path.join('temp')));
    //app.use('/static', express.static('public'));

    app.set('views', './src/views');

    //app.use('/', mainRoutes);
    // //app.use('/allbikes', allBikesRoutes);
    // app.use('/Bike-Spare-Parts', sparePartsRoutes);
    // app.use('/accessories', accessoriesRoutes);
    // app.use('/login', loginRoutes);
    // app.use('/signup', signupRoutes);

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

// const express = require('express'),
//     bodyParser = require('body-parser'),
//     cookieParser = require('cookie-parser'),
//     session = require('express-session');

// module.exports = function(data) {

//     let app = express();

//     app.set('view engine', 'pug');
//     if (process.env.ENV_MODE === 'PRODUCTION') {
//         app.use('/static', express.static('build'));
//     } else {
//         app.use('/static', express.static('public'));
//     }
//     app.use(cookieParser());
//     app.use(bodyParser.urlencoded({ extended: true }));
//     app.use(bodyParser.json());
//     app.use(cookieParser());
//     app.use(session({ secret: 'totally random' }));

//     require('./passport')(app, data);

//     return app;
// };