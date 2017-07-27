const userDomainModel = require('../models/domainModels/user-domainModel');
const bikeDomainModel = require('../models/domainModels/bike-domainModel');
const passport = require('passport');
const { SHA256 } = require('crypto-js');

module.exports = function(data, factories, constants, errorHandler) {
    return {
        getSignUpForm(req, res) {
            return res.render('signup', {});
        },
        getLogInForm(req, res) {
            return res.render('login', {});
        },
        registerNewUser(req, res) {
            req.body.password = SHA256(req.body.password).toString();
            req.body.password_repeat = SHA256(req.body.password_repeat).toString();

            const bodyUser = req.body;
            data.user.findByUsername(bodyUser.email)
                .then((dbUser) => {
                    if (dbUser) {
                        throw new Error('User already exists. Please try with another email');
                    }
                    return data.user.create(bodyUser);
                }).then((dbUser) => {
                    req.login(dbUser, () => {
                        req.flash('success', 'Successful registration');
                        res.redirect('/auth/myProfile');
                    });
                }).catch((err) => {
                    req.flash('error', err.message);
                    res.redirect('/auth/signUp');
                });
        },
        getProfile(req, res) {
            data.user.findByUsername(req.user.email)
                .then((dbUser) => {
                    res.render('myProfile', {
                        model: dbUser,
                    });
                });
        },
        getUpdateProfile(req, res) {
            res.render('updateProfile', {
                user: req.user,
            });
        },
        getMyCart(req, res) {
            res.render('myCart', {
                user: req.user,
            });
        },
        updateProfile(req, res) {
            //todo if some inputs are empty not to write it in DB???
            const bodyUser = req.body;
            bodyUser._id = req.user._id;

            data.user.findByUsername(bodyUser.email)
                .then((dbUser) => {
                    if (dbUser) {
                        throw new Error('Email already exists. Please try with another email!');
                    }
                    return data.user.updateById(bodyUser);
                }).then((updatedUser) => {
                    req.flash('success', 'You successfully update your profile');
                    res.redirect('/auth/myProfile');
                }).catch((err) => {
                    req.flash('error', err.message);
                    res.redirect('/auth/updateProfile');
                });
        },
        completeOrder(req, res) {
            const bodyUser = req.user;
            // console.log(req.user._id + ' USER ID');

            if (!bodyUser) {
                return res.status(401).send('Unauthorized');
            }
            data.user.findByUsername(bodyUser.email)
                .then((dbUser) => {
                    if (dbUser.password !== bodyUser.password) {
                        return res.status(400).send('Current password does not match');
                    }
                    const items = req.body.items;
                    console.log(items);
                    if (Array.isArray(items)) {
                        console.log('It is  Array');
                        return data.bike.getAllByIds(items);
                    }
                })
                .then((bikes) => {
                    // bikes.map((x) => console.log(x._id));
                    return data.user.addItemsToOrdersHistory(req.user._id, bikes);
                })
                .then((products) => {
                    req.flash('success', 'You successfully order your e-bikes!');
                    res.redirect('/auth/myProfile');
                })
                // console.log(bikes.map((x) => x.id));
                // return res.status(200).send(`Purchase done`);
                .catch((err) => {
                    console.log(err);
                    //errorHandler.handleError(req, res, err);
                });
            // console.log(bikes);
            // return res.status(200).send(`${bikes}`);
        },
        getOrdersHistory(req, res) {
            const bodyUser = req.user;
            const id = bodyUser._id;
            data.user.findByUsername(bodyUser.email)
                .then((dbUser) => {
                    const orders = dbUser.ordersHistory;

                    console.log(orders, ' ORDERS');
                    const bikes = [];

                    let itemsProcessed = 0;

                    orders.forEach((orderId) => {
                        data.bike.findById(orderId)
                            .then((bike) => {
                                console.log(bike, ' Testing BIKE in loop');
                                bikes.push(bike);
                                itemsProcessed++;

                                if (itemsProcessed === orders.length) {
                                    console.log(bikes, ' Bikes');
                                    return res.render('ordersHistory', {
                                        model: bikes,
                                    });
                                }
                            });
                    });
                });
        },
    };
};