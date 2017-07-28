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