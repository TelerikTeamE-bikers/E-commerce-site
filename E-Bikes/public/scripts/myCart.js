/* globals $ */
$(document).ready(function() {
<<<<<<< HEAD

=======
    const domain = 'localhost:3030';
>>>>>>> origin/master
    // function renderCart() {
    const listOrderedBikes = $('.flex__container');
    let storageArr = JSON.parse(sessionStorage.getItem('shoppingCart'));

    let output = '';
    for (let i in storageArr) {
        let order = +i + 1;
        output += '<li class="flex__item box">' + 'Order' + '&nbsp' + order + '&nbsp' + '<div class="product_id">' + storageArr[i].title + '<br>' + storageArr[i].price + '</div>' + '<div class=".product-item__id">' + storageArr[i].id + '</div>' +
            '<button class="delete_item">' + 'delete' + '</button>' + '</li>';
    }

    listOrderedBikes.html(output);
    // }

    // renderCart();

<<<<<<< HEAD
    // Deleting a selected bike purchase from the cart
    $('.delete_item').click(function() {
        $(this).parent().remove();
        const orderObject = $(this).parent().text();
=======
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
>>>>>>> origin/master

        const orderId = orderObject.split('\xa0');
        let intOrderId = parseInt(orderId[1]) - 1;

        if (

            storageArr.indexOf(intOrderId) === -1) {
            intOrderId = Math.floor(intOrderId / 64);
        }

        storageArr.splice(intOrderId, 1);
        sessionStorage.setItem('shoppingCart', JSON.stringify(storageArr));

        //  sessionStorage.getItem('shoppingCart', JSON.stringify(storageArr))
        const orderCounts = $('.numberOfPurchases');
        orderCounts.html(JSON.parse(sessionStorage.getItem('shoppingCart')).length);



        // const bikeId = $(this)
        //     .prev()
        //     .text();

        // console.log('id to delete ' + bikeId)
        // let currentBikes = JSON.parse(sessionStorage.getItem('shoppingCart'));

        // //currentBikes.remove((x) => x.id === bikeId);
        // let counter = 0;
        // // currentBikes = currentBikes.filter((item) => {
        // //     return !(item.id === bikeId);
        // // });

        // for (let i = 0; i < currentBikes.length; i++) {
        //     let counter = 0;
        //     if (currentBikes[i].id === bikeId && counter === 0) {
        //         currentBikes.splice(i, 1);
        //         counter++;
        //     }
        // }

        // console.log("currentbikes")
        // console.log(currentBikes)
        // sessionStorage.setItem('shoppingCart', JSON.stringify(currentBikes));

        // $(this).parent().remove();

        // let orderCount = $('.numberOfPurchases')
        // orderCount.html(JSON.parse(sessionStorage.getItem('shoppingCart')).length)
        // console.log("orders count " + orderCount);
    });

<<<<<<< HEAD
    $('.btn__clearCart').click(function(event) {
        console.log('cleared')

        storageArr = []
        sessionStorage.setItem('shoppingCart', JSON.stringify(storageArr))
        listOrderedBikes.html(' ');
        $('.numberOfPurchases').html('')

    })

=======
>>>>>>> origin/master
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
<<<<<<< HEAD
        //console.log(JSON.parse(params.items));
=======
        // console.log(JSON.parse(params.items));
>>>>>>> origin/master
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