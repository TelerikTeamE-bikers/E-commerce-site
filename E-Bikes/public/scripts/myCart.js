/* globals $ */
$(document).ready(function() {

    // function renderCart() {
    const listOrderedBikes = $('.flex__container');
    const storageArr = JSON.parse(sessionStorage.getItem('shoppingCart'));

    let output = '';
    for (let i in storageArr) {
        output += '<li class="flex__item box">' + 'Order' + i + '&nbsp' + '<div class="product_id">' + storageArr[i] + '</div>' +
            '<button>' + 'delete' + '</button>' + '</li>';
    }

    listOrderedBikes.html(output);
    // }

    // renderCart();

    $('button').click(function() {
        $(this).parent().remove();
        console.log()

    });

    $('.btn__purchase').click(function(event) {
        // console.log({ items: storageArr });
        console.log('It works');
        let http = new XMLHttpRequest();
        let url = 'http://localhost:3030/auth/completeOrder';
        let params = JSON.stringify({ items: storageArr });
        // http.open("POST", url, true);

        // http.setRequestHeader("Content-type", "application/json");

        // http.onreadystatechange = function() {
        //     //Call a function when the state changes.
        //     if (http.readyState == 4 && http.status == 200) {
        //         alert(http.responseText);
        //     }
        // }
        console.log(params);
        // http.send(params);
        $.ajax({
            method: 'POST',
            url: url,
            data: params,
            contentType: 'application/json',
            success: () => {
                alert('You successfully order your e-bikes!');
                sessionStorage.removeItem('shoppingCart');
                listOrderedBikes.html('');
            },
            error: () => { alert(http.responseText) }
        });
        //.done(function(msg) {});

    });
});