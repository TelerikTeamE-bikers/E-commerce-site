/* globals $ */
$(document).ready(function() {
    const listOrderedBikes = $('#showPurchases');
    const storageArr = JSON.parse(sessionStorage.getItem('shoppingCart'));

    let output = '';
    for (let i in storageArr) {
        output += '<li>' + 'Order' + i + '&nbsp' + '<div class="product_id">' + storageArr[i] + '</div>' +
            '<button>' + 'delete' + '</button>' + '</li>';
    }
    listOrderedBikes.html(output);


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
            })
            .done(function(msg) {});

    });
});