/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ShoppingCart = __webpack_require__(5);

var _ShoppingCart2 = _interopRequireDefault(_ShoppingCart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(document).ready(function () {
    var shoppingCart = new _ShoppingCart2.default();

    $('.btn__add-to-cart').click(function (event) {
        var currentBike = {};
        currentBike.title = $(this).parent().siblings('.product-item__title').text();
        currentBike.price = $(this).parent().siblings('.product-item__price').text();
        currentBike.id = $(this).parent().siblings('.product-item__id').text();

        shoppingCart.addItemToCart(currentBike);

        var orderCount = $('.numberOfPurchases');
        orderCount.html(JSON.parse(sessionStorage.getItem('shoppingCart')).length);
        console.log(orderCount);
    });
}); /* globals $ */


$('.search-button').click(function (event) {
    var queryString = $('.query-string').val();
    var url = 'http://localhost:3030/bike/getBikesByFilter?query=' + queryString;
    $.ajax({
        method: 'GET',
        url: url
    }).done(function (html) {
        $('.html-container').html(html);
        //$('.query-string').val('');
    }).fail(function (error) {
        console.log(error);
    });
});

//Filtering by ascend / descend / brand name

$('#filter').on('change', function (event) {
    var queryString = void 0;
    if ($(this).val() === 'asc-price') {
        queryString = 'price_asc';
    } else if ($(this).val() === 'dsc-price') {
        queryString = 'price_dsc';
    } else {
        queryString = 'name_asc';
    }
    var url = 'http://localhost:3030/bike/getBikesByFilter?query=' + queryString;
    $.ajax({
        method: 'GET',
        url: url
    }).done(function (html) {
        $('.html-container').html(html);
    }).fail(function (error) {
        console.log(error);
    });
});

// switch (event.val()) {
//     case "asc-price":
//         console.log(1);
//         break;
//     case "dsc-price":
//         console.log(2);
//         break;
//     case "brand-name":
//         console.log(3);
//         break;
//     default:
//         console.log('test')

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ShoppingCart = function () {
    function ShoppingCart() {
        _classCallCheck(this, ShoppingCart);

        this._name = 'shoppingCart';
        this._items = [];
        this.initItems();
    }

    _createClass(ShoppingCart, [{
        key: 'initItems',
        value: function initItems() {
            var items = sessionStorage.getItem(this._name);
            console.log(items);

            if (items !== null) {
                this._items = JSON.parse(items);
                console.log('init done');
            }

            console.log(this._items);
            return items;
        }
    }, {
        key: 'loadItems',
        value: function loadItems(items) {
            this._items = items;
        }
    }, {
        key: 'saveCart',
        value: function saveCart() {
            sessionStorage.setItem(this._name, JSON.stringify(this._items));
        }

        // function Item(name, price, count) {
        //     this.name = name
        //     this.price = price
        //     this.count = count
        // }

        // function loadCart() {
        //     cart = JSON.parse(localStorage.getItem("shoppingCart"));
        //     if (cart === null) {
        //         cart = []
        //     }
        // }

    }, {
        key: 'addItemToCart',
        value: function addItemToCart(item) {
            this._items.push(item);
            this.saveCart();
        }

        // obj.removeItemFromCart = function(name) { // Removes one item
        //     for (var i in cart) {
        //         if (cart[i].name === name) { // "3" === 3 false
        //             cart[i].count--; // cart[i].count --
        //             if (cart[i].count === 0) {
        //                 cart.splice(i, 1);
        //             }
        //             break;
        //         }
        //     }
        //     saveCart();
        // };

        // obj.clearCart = function() {
        //     cart = [];
        //     saveCart();
        // }

        // obj.countCart = function() { // -> return total count
        //     var totalCount = 0;
        //     for (var i in cart) {
        //         totalCount += cart[i].count;
        //     }

        //     return totalCount;
        // };

        // obj.totalCart = function() { // -> return total cost
        //     var totalCost = 0;
        //     for (var i in cart) {
        //         totalCost += cart[i].price * cart[i].count;
        //     }
        //     return totalCost.toFixed(2);
        // };

        // obj.listCart = function() { // -> array of Items
        //     var cartCopy = [];
        //     console.log("Listing cart");
        //     console.log(cart);
        //     for (var i in cart) {
        //         console.log(i);
        //         var item = cart[i];
        //         var itemCopy = {};
        //         for (var p in item) {
        //             itemCopy[p] = item[p];
        //         }
        //         itemCopy.total = (item.price * item.count).toFixed(2);
        //         cartCopy.push(itemCopy);
        //     }
        //     return cartCopy;
        // };

    }, {
        key: 'items',
        get: function get() {
            return this._items;
        }
    }, {
        key: 'name',
        get: function get() {
            return this._name;
        }
    }]);

    return ShoppingCart;
}();

exports.default = ShoppingCart;

/***/ })

/******/ });