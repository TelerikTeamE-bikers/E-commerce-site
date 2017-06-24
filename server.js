const ex = require('express');

var app = ex();

app.get('/', (req, res) => {
    res.send('hi');
});

app.listen(3000);