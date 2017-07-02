const express = require('express');
<<<<<<< HEAD
const path = require('path');
// const homeController = require('./src/controllers/home-controller');  
const bikeController = require('./src/controllers/bike-controller');
=======

// const homeController = require('./src/controllers/home-controller'); // Not sure how to use it yet
//const bikeController = require('./src/controllers/bike-controller');
>>>>>>> ce82410bcd40722074c3f5ee47371ac11f392741

const app = express();
//app.use(express.static(path.join('temp')));
app.use('/static', express.static('temp'));
app.set('view engine', 'pug');
app.set('views', './src/views');

<<<<<<< HEAD
=======
const mainRoutes = require('./src/routes');
const allBikesRoutes = require('./src/routes/allBikes.js');
const spareParts = require('./src/routes/spareParts.js');

app.use('/', mainRoutes);
app.use('/allbikes', allBikesRoutes);
app.use('/Bike-Spare-Parts', spareParts);
>>>>>>> ce82410bcd40722074c3f5ee47371ac11f392741

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
app.use((req, res, next) => {
    const err = new Error('Not Found. Please verify you have entered a valid address')
    err.status = 404;
    next(err)
})

//error handler
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status)
    res.render('error')
})

app.listen(3030, () => {
    const date = new Date();
    console.log('  >Log--' + date.toLocaleTimeString() +
        ` :: App running at :3030`);
});

module.exports.app = app;