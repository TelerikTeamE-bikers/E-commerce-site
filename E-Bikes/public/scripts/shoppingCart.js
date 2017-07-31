class ShoppingCart {
    constructor() {
        this._items = this.loadItems();
        this._name = 'shoppingCart';
    }

    get items() {
        return this._items;
    }

    loadItems() {
        let cart = JSON.parse(localStorage.getItem(this._name));

        if (cart === null) {
            cart = [];
        }
    }

    saveCart() {
        localStorage.setItem(this._name, JSON.stringify(this._items));
    }
    addItemToCart(item) {
        this._items.push(item);
        this.saveCart();
    }
}
module.exports = {
    getCart() {
        return new ShoppingCart();
    },
}; // eslint-disable-line