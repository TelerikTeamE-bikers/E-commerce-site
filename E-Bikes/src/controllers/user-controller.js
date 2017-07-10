const errorHandler = require('../core/errorHandler');
const userDomainModel = require('../models/domainModels/user-domainModel');
const bikeDomainModel = require('../models/domainModels/bike-domainModel');

module.exports = function (data) {
    return {
        registerUser(req, res) {
            let user = userDomainModel.getUser("go6o", "123");
            console.log(user);

            let bike = bikeDomainModel.getBike("brand 1", "model 1", 100);
            console.log(bike);

            user.AddToCart(bike);
            console.log(user);
        }
    }
};