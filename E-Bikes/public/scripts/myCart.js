/* globals $ */
$(document).ready(function() {
    const domain = 'localhost:3030';
    // function renderCart() {
    const listOrderedBikes = $('.flex__container');
    const storageArr = JSON.parse(sessionStorage.getItem('shoppingCart'));

    let output = '';
    for (let i in storageArr) {
        output += '<li class="flex__item box">' + 'Order' + i + '&nbsp' + '<div class="product_id">' + storageArr[i].title + '<br>' + storageArr[i].price + '</div>' +
            '<button>' + 'delete' + '</button>' + '</li>';
    }

    listOrderedBikes.html(output);
    // }

    // renderCart();

    $('button').click(function() {
        let bikeId = $(this).parent()
            .siblings('.product-item__id')
            .text();

        console.log('id to delete ' + bikeId)
        let currentBikes = JSON.parse(sessionStorage.getItem('shoppingCart'));

        //currentBikes.remove((x) => x.id === bikeId);
        currentBikes = currentBikes.filter((item) => {
            return !(item.id === bikeId);
        });

        console.log("currentbikes")
        console.log(currentBikes)
        sessionStorage.setItem('shoppingCart', JSON.stringify(currentBikes));

        $(this).parent().remove();

        let orderCount = $('.numberOfPurchases')
        orderCount.html(JSON.parse(sessionStorage.getItem('shoppingCart')).length)
        console.log("orders count " + orderCount);
    });

    $('.btn__purchase').click(function(event) {
        // console.log({ items: storageArr });
        console.log('It works');
        let http = new XMLHttpRequest();
        let url = 'http://localhost:3030/auth/completeOrder';
        let bikeIds = storageArr.map((item) => item.id)
        let params = JSON.stringify({ items: bikeIds });
        console.log(params)
            // http.open("POST", url, true);

        // http.setRequestHeader("Content-type", "application/json");

        // http.onreadystatechange = function() {
        //     //Call a function when the state changes.
        //     if (http.readyState == 4 && http.status == 200) {
        //         alert(http.responseText);
        //     }
        // }
        // console.log(JSON.parse(params.items));
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
                let orderCount = $('.numberOfPurchases')
                orderCount.html('');
            },
            error: () => { alert(http.responseText) }
        });
        //.done(function(msg) {});

    });
});