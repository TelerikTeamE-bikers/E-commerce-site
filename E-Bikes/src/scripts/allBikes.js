/* globals $ */
import ShoppingCart from './modules/ShoppingCart';

$(document).ready(function () {
    const shoppingCart = new ShoppingCart();

    // let img = document.createElement('img');
    // img.src = src;
    // document.body.appendChild(img);

    $('.btn__add-to-cart').click(function (event) {

        // Check if user is logged in 
        const loginPopUp = $('.loginPopUp_Box_Hidden');
        const validateAuth = $('.site-header__my-cart');
        if (validateAuth.length === 0) {
            loginPopUp.removeClass('loginPopUp_Box_Hidden')
                .addClass('loginPopUp_Box_Display');
        }
        const currentBike = {};
        currentBike.title = $(this).parent()
            .siblings('.product-item__title').text();
        currentBike.price = $(this).parent()
            .siblings('.product-item__price').text();
        currentBike.id = $(this).parent()
            .siblings('.product-item__id').text();
        currentBike.picture = $(this).parent()
            .siblings('.product-item__photo').attr('src');

        console.log( $(this).parent()
            .siblings('.product-item__photo').attr('src'))

        shoppingCart.addItemToCart(currentBike);

        const orderCount = $('.numberOfPurchases');
        orderCount.html(JSON.parse(sessionStorage.getItem('shoppingCart')).length);
        console.log(orderCount);
    });
});

$('.search-button').click(function (event) {
    const queryString = $('.query-string').val();
    const url = `http://localhost:3030/bike/getBikesByFilter?query=${queryString}`;
    $.ajax({
        method: 'GET',
        url: url,
    })
        .done(function (html) {
            $('.html-container').html(html);
            //$('.query-string').val('');
        })
        .fail(function (error) {
            console.log(error);
        });
});


//Filtering by ascend / descend / brand name

$('#filter').on('change', function (event) {
    let queryString;
    if ($(this).val() === 'asc-price') {
        queryString = 'price_asc';
    } else if ($(this).val() === 'dsc-price') {
        queryString = 'price_dsc';
    } else {
        queryString = 'name_asc';
    }
    const url = `http://localhost:3030/bike/getBikesByProperty?query=${queryString}`;
    $.ajax({
        method: 'GET',
        url: url,
    })
        .done(function (html) {
            $('.html-container').html(html);
        })
        .fail(function (error) {
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