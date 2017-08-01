/* globals $*/
if (sessionStorage.getItem('shoppingCart') !== null) {
    const orderCount = $('.numberOfPurchases');
    orderCount.html(JSON.parse(sessionStorage.getItem('shoppingCart')).length);
} // eslint-disable-line