class ShoppingCart {
    constructor() {
        this._name = 'shoppingCart';
        this._items = [];
        this.initItems();
    }

    get items() {
        return this._items;
    }

    get name() {
        return this._name;
    }

    initItems() {
        const items = sessionStorage.getItem(this._name);
        console.log(items);

        if (items !== null) {
            this._items = JSON.parse(items);
            console.log('init done');
        }

        console.log(this._items);
        return items;
    }

    loadItems(items) {
        this._items = items;
    }

    saveCart() {
        sessionStorage.setItem(this._name, JSON.stringify(this._items));
    }

    // function Item(name, price, count) {
    //     this.name = name
    //     this.price = price
    //     this.count = count
    // }

    // function loadCart() {
    //     cart = JSON.parse(localStorage.getItem("shoppingCart"));
    //     if (cart === null) {
    //         cart = []
    //     }
    // }

    addItemToCart(item) {
        this._items.push(item);
        this.saveCart();
    }

    // obj.removeItemFromCart = function(name) { // Removes one item
    //     for (var i in cart) {
    //         if (cart[i].name === name) { // "3" === 3 false
    //             cart[i].count--; // cart[i].count --
    //             if (cart[i].count === 0) {
    //                 cart.splice(i, 1);
    //             }
    //             break;
    //         }
    //     }
    //     saveCart();
    // };

    // obj.clearCart = function() {
    //     cart = [];
    //     saveCart();
    // }

    // obj.countCart = function() { // -> return total count
    //     var totalCount = 0;
    //     for (var i in cart) {
    //         totalCount += cart[i].count;
    //     }

    //     return totalCount;
    // };

    // obj.totalCart = function() { // -> return total cost
    //     var totalCost = 0;
    //     for (var i in cart) {
    //         totalCost += cart[i].price * cart[i].count;
    //     }
    //     return totalCost.toFixed(2);
    // };

    // obj.listCart = function() { // -> array of Items
    //     var cartCopy = [];
    //     console.log("Listing cart");
    //     console.log(cart);
    //     for (var i in cart) {
    //         console.log(i);
    //         var item = cart[i];
    //         var itemCopy = {};
    //         for (var p in item) {
    //             itemCopy[p] = item[p];
    //         }
    //         itemCopy.total = (item.price * item.count).toFixed(2);
    //         cartCopy.push(itemCopy);
    //     }
    //     return cartCopy;
    // };
}
export default ShoppingCart;