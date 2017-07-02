// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const protocol = 'mongodb:/';
// const server = 'localhost:27017';
// const databaseName = 'testDb';

// const loadAllBikes = (req, res) => {
//     //mongoose.connect('mongodb://localhost:27017/DatabaseName')

//     // MongoClient.connect('mongodb://localhost:27017/DatabaseName')
//     //     .then((db)=> {
//     //         console.log(db);
//     //         // query the database...
//     //     })

//     // console.log(a);

//     res.render('Bikes', {
//         title: 'Bike Data',
//         header: 'All Bikes:',
//         message: 'no bikes for now',
//     });
// };

// // app.get("/:id", (req, res) => {
// //   res.send(superheroes[req.params.id]);
// // });

// // app.post("/", (req, res) => {
// //   let superhero = req.body;
// //   superhero.id = superheroes.length;
// //   superheroes.push(superhero)
// //   res.send(superhero);
// // });

// module.exports = {
//     loadAllBikes,
// };