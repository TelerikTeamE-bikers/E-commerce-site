const bikeModel = require('../models/bike');
//const validator = require('../common/validator');

module.exports = function(data) {
    return {
        getLoginForm(req, res) {
            res.render('login-view', {
                result: {
                    title: 'Login',
                },
            });
        },
        getRegisterForm(req, res) {
            res.render('register-view', {
                result: {
                    title: 'Register',
                },
            });
        },
        register(req, res) {
            validator.validatePasswordsMatch(req.body.password,
                req.body.passConfirmation);

            const user = userModel
                .getUser(req.body.username, req.body.password);

            data.addUser(user);
            res.redirect('/login');
        },
        logout(req, res) {
            req.logout();
            res.status(200).redirect('/');
        },
        getProfile(req, res) {
            const result = {};
            result.title = 'User profile';

            if (req.isAuthenticated()) {
                result.user = req.user.username;
            }

            res.render('profile-view', { result });
        },
        unauthorized(req, res) {
            res.render('unauthorized-view', {
                result: {
                    title: 'Unauthorized',
                },
            });
        },
    };
};


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
