/* globals $ */
$(document).ready(function() {
    const domain = 'localhost:3030';

    const listOrderedBikes = $('.flex__container');
    let storageArr = JSON.parse(sessionStorage.getItem('shoppingCart'));

    // total order price 
    const eachBikePriceStr = storageArr.map(function(a) {
        return a.price;
    });
    // removing € symbol
    for (let i = 0; i < eachBikePriceStr.length; i += 1) {
        eachBikePriceStr[i] = (eachBikePriceStr[i]).replace(/[^\d.-]/g, '');
    }
    // Parsing each bike price string and returning the sum 
    function eachBikePriceSum(arr) {
        return arr.map(Number)
            .reduce((a, b) => a + b);
    }
    let totalPrice = eachBikePriceSum(eachBikePriceStr);
    console.log(totalPrice);
    // displaying the total price 
    $('.totalPrice').text(`Total Price: ${totalPrice} €`);

    // Rendering HTML of each bike in the cart 
    let output = '';
    for (let i in storageArr) {
        const order = +i + 1;
        output += '<li class="flex__item box">' + 'Order' + '&nbsp' + order + '&nbsp' + '<div class="product_id">' + storageArr[i].title +
            '<br>' + '&nbsp' + storageArr[i].price + '&nbsp' + '</div>' + '<div class=".product-item__id">' + '</div>' +
            '<button class="delete_item">' + 'delete' + '</button>' + '<span class="bike_id">' + storageArr[i].id + '</span>' + '</li>';
    }

    listOrderedBikes.html(output);
    // }

    // renderCart();

    // Deleting a selected bike purchase from the cart
    $('.delete_item').click(function() {
        $(this).parent().remove();
        const orderObject = $(this).parent().text();
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

        // Deducting the price of the deleted bike form teh total price
        let deletedBikePrice = orderId[3];
        deletedBikePrice = parseInt(deletedBikePrice.replace(/[^\d.-]/g, ''));
        totalPrice -= deletedBikePrice;
        $('.totalPrice').text(`Total Price: ${totalPrice} €`);
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

    // Clearing the cart , all orders removed
    $('.btn__clearCart').click(function(event) {
        console.log('cleared');

        storageArr = [];
        sessionStorage.setItem('shoppingCart', JSON.stringify(storageArr))
        listOrderedBikes.html(' ');
        $('.numberOfPurchases').html('');
        totalPrice = 0;
        $('.totalPrice').text(`Total Price: ${totalPrice} €`);

    })

    $('.btn__purchase').click(function(event) {
        // console.log({ items: storageArr });
        console.log('It works');
        let http = new XMLHttpRequest();
        let url = 'http://localhost:3030/auth/completeOrder';
        let bikeIds = storageArr.map((item) => item.id);
        let params = JSON.stringify({ items: bikeIds });
        console.log(params);
        // http.open("POST", url, true);

        // http.setRequestHeader("Content-type", "application/json");

        // http.onreadystatechange = function() {
        //     //Call a function when the state changes.
        //     if (http.readyState == 4 && http.status == 200) {
        //         alert(http.responseText);
        //     }
        // }
        //console.log(JSON.parse(params.items));
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