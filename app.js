const ex = require('express');
const homeController = require('./src/controllers/home-controller')

var app = ex();

app.get('/', (req, res) => homeController.loadHome(req, res));
app.get('/2', (req, res) => homeController.loadHome2(req, res));

app.listen(3000);