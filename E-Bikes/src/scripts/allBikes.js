/* globals $ */
import ShoppingCart from './modules/ShoppingCart';

$(document).ready(function() {
    const shoppingCart = new ShoppingCart();

    $('.btn__add-to-cart').click(function(event) {
        const currentBikeId = {};
        currentBikeId.title = $(this).parent()
            .siblings('.product-item__title').text();
        currentBikeId.price = $(this).parent()
            .siblings('.product-item__price').text();

        shoppingCart.addItemToCart(currentBikeId);

        const orderCount = $('.numberOfPurchases');
        orderCount.html(JSON.parse(sessionStorage.getItem('shoppingCart')).length);
        console.log(orderCount);
    });
});

$('.search-button').click(function(event) {
    const queryString = $('.query-string').val();
    const url = `http://localhost:3030/bike/getBikesByFilter?query=${queryString}`;
    $.ajax({
            method: 'GET',
            url: url,
        })
        .done(function(html) {
            $('.html-container').html(html);
            $('.query-string').val('');
        })
        .fail(function(error) {
            console.log(error);
        });
});


//Filtering by ascend / descend / brand name

$('#filter').on('change', function(event) {
    let queryString;
    if ($(this).val() === 'asc-price') {
        queryString = 'price_asc';
    } else if ($(this).val() === 'dsc-price') {
        queryString = 'price_dsc';
    } else {
        queryString = 'name_asc';
    }
    const url = `http://localhost:3030/bike/getBikesByFilter?query=${queryString}`;
    $.ajax({
            method: 'GET',
            url: url,
        })
        .done(function(html) {
            $('.html-container').html(html);
        })
        .fail(function(error) {
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