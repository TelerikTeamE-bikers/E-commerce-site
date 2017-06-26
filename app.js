const express = require('express');
// const homeController = require('./src/controllers/home-controller'); // Not sure how to use it yet
const app = express();
app.set('view engine', 'pug');
app.set('views', './src/views');

// app.get('/', (req, res) => { // using PUG
//     res.send(homeController.loadHome);
// });

app.get('/', (req, res) => { // Rendering home page using PUG
    res.render('home', {
        title: 'Home page',
        message: 'Hello there!. This is home page created using pug',
    });
});

app.listen(3000);