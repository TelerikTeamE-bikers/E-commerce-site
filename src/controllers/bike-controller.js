const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const mongoose = require('mongoose');
const Unit = mongoose.model('Unit', { unitType: String });

const loadAllBikes = (req, res) => {
    //mongoose.connect('mongodb://localhost:27017/DatabaseName')

    // MongoClient.connect('mongodb://localhost:27017/DatabaseName')
    //     .then((db)=> {
    //         console.log(db);
    //         // query the database...
    //     })

    const b = new Unit({ unitType: 'Bike' }).save(() => {
        const a = Unit.find({ unitType: 'Bike' }).exec(() => {
            console.log(a);
        });
    }); // create

    // var a = Unit.find({ unitType: 'Bike' }).exec(callback); // fetch

    // console.log(a);

    res.render('Bikes', {
        title: 'Bike Data',
        header: 'All Bikes:',
        message: 'no bikes for now',
    });
};

// app.get("/:id", (req, res) => {
//   res.send(superheroes[req.params.id]);
// });

// app.post("/", (req, res) => {
//   let superhero = req.body;
//   superhero.id = superheroes.length;
//   superheroes.push(superhero)
//   res.send(superhero);
// });

module.exports = {
    loadAllBikes,
};