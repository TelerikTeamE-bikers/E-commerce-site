let orderCount = $('.numberOfPurchases')

orderCount.html(JSON.parse(sessionStorage.getItem('shoppingCart')).length)
console.log(orderCount)