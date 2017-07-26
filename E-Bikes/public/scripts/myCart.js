$(document).ready(function() {

    const listOrderedBikes = $('#showPurchases')
    const storageArr = JSON.parse(sessionStorage.getItem("shoppingCart"))

    let output = '';
    for (let i in storageArr) {
        output += '<li>' + 'Order' + i + '&nbsp' + storageArr[i] +
            '<button>' + 'delete' + '</button>' + '</li>';
    }
    listOrderedBikes.html(output);


    $('button').click(function() {
        $(this).parent().remove();
        console.log(i)

    })
});