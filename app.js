const express = require('express');
const path = require('path');
// const homeController = require('./src/controllers/home-controller');  
const bikeController = require('./src/controllers/bike-controller');

const app = express();
//app.use(express.static(path.join('temp')));
app.use('/static', express.static('temp'));
app.set('view engine', 'pug');
app.set('views', './src/views');


// app.get('/', (req, res) => { // using PUG
//     res.send(homeController.loadHome);
// });

app.get('/', (req, res) => { // Rendering home page using PUG
    res.render('home', {
        title: 'Home page',
        message: 'Hello there!. This is home page created using PUG',
    });
});

app.get('/AllBikes', (req, res) => {
    bikeController.loadAllBikes(req, res);
});

app.get('/404', (req, res) => {
    res.status(404).send({
        error: 'Page not found.',
        name: 'Todo App v1.0',
    });
});

app.listen(3030, () => {
    const date = new Date();
    console.log('  >Log--' + date.toLocaleTimeString() +
        ` :: App running at :3030`);
});

module.exports.app = app;