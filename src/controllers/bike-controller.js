const express = require('express');
const app = express();
app.set('view engine', 'pug');
app.set('views', '../views');


const loadAllBikes = (req, res) => {
    res.render('Bikes', {
        title: 'Bike Data',
        header: 'All Bikes:',
        message: 'no bikes for now',
    });
};

module.exports = {
    loadAllBikes,
};