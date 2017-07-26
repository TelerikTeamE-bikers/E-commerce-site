$(document).ready(function() {

    const listOrderedBikes = $('#showPurchases')
    const storageArr = JSON.parse(sessionStorage.getItem("shoppingCart"))

    let output = '';
    for (let i in storageArr) {
        output += '<li>' + storageArr[i] + '</li>' +
            '<button>' + 'delete' + '</button>';
    }
    listOrderedBikes.html(output);
});