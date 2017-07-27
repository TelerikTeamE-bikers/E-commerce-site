$(document).ready(function () {

    const listOrderedBikes = $('#showPurchases')
    const storageArr = JSON.parse(sessionStorage.getItem("shoppingCart"))

    let output = '';
    for (let i in storageArr) {
        output += '<li>' + 'Order' + i + '&nbsp' + storageArr[i] +
            '<button>' + 'delete' + '</button>' + '</li>';
    }
    listOrderedBikes.html(output);


    $('button').click(function () {
        $(this).parent().remove();
        console.log(i)

    });

    $('.btn__purchase').click(function (event) {
        console.log({ items: storageArr });
        console.log()
        let http = new XMLHttpRequest();
        let url = 'http://localhost:3030/auth/buybikes';
        let params = JSON.stringify({ items: storageArr });
        http.open("POST", url, true);

        http.setRequestHeader("Content-type", "application/json");

        http.onreadystatechange = function () {
            //Call a function when the state changes.
            if (http.readyState == 4 && http.status == 200) {
                alert(http.responseText);
            }
        }

        http.send(params);
    });
});