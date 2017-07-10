const errorHandler = require('../core/errorHandler');
const userDomainModel = require('../models/domainModels/user-domainModel');
const bikeDomainModel = require('../models/domainModels/bike-domainModel');

module.exports = function (data) {
    return {
        registerUser(req, res) {
            // let user = userDomainModel.getUser("go6o", "123");
            // console.log()
            // console.log("creating new user:")
            // console.log(user);
            // console.log()

            // let bike = bikeDomainModel.getBike("brand 1", "model 1", 100);
            // console.log()
            // console.log("creating new bike:")
            // console.log(bike);
            // console.log()

            // console.log()
            // console.log("adding bike to user cart:")
            // user.AddToCart(bike);
            // console.log(user);
            // console.log()

            // console.log()
            // console.log("saving user to db:")
            // data.user.createUser(user);
            //console.log()

            // console.log()
            // console.log("geting user from db:")
            // let foundUser = data.user.findUserByCredentials("go6o", "123");
            // console.log("Found user:", foundUser);

            data.user.findUserByCredentials("go6o", "123").then((user) => {
                console.log("Found user:", user);

                res.render('home', {});
            }).catch((err) => {
                errorHandler.handleError(req, res, err);
            });

        }
    }
};