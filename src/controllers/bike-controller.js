const loadAllBikes = (req, res) => {
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