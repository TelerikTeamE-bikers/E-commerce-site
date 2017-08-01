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
        // Check if user is logged in 
        var loginPopUp = $('.loginPopUp_Box_Hidden');
        var validateAuth = $('.site-header__my-cart');
        if (validateAuth.length === 0) {
            loginPopUp.removeClass('loginPopUp_Box_Hidden').addClass('loginPopUp_Box_Display');
        }
        var currentBike = {};
        currentBike.title = $(this).parent().siblings('.product-item__title').text();
        currentBike.price = $(this).parent().siblings('.product-item__price').text();
        currentBike.id = $(this).parent().siblings('.product-item__id').text();
        currentBike.picture = $(this).parent().siblings('.product-item__photo').attr('src');

        console.log($(this).parent().siblings('.product-item__photo').attr('src'));

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
        //  $('.query-string').val('');
    }).fail(function (error) {
        console.log(error);
    });
});

//  Filtering by ascend / descend / brand name

$('#filter').on('change', function (event) {
    var queryString = void 0;
    if ($(this).val() === 'asc-price') {
        queryString = 'price_asc';
    } else if ($(this).val() === 'dsc-price') {
        queryString = 'price_dsc';
    } else {
        queryString = 'name_asc';
    }
    var url = 'http://localhost:3030/bike/getBikesByProperty?query=' + queryString;
    $.ajax({
        method: 'GET',
        url: url
    }).done(function (html) {
        $('.html-container').html(html);
    }).fail(function (error) {
        console.log(error);
    });
}); // eslint-disable-line

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
    }, {
        key: 'addItemToCart',
        value: function addItemToCart(item) {
            this._items.push(item);
            this.saveCart();
        }
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

exports.default = ShoppingCart; // eslint-disable-line

/***/ })

/******/ });