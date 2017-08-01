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

    addItemToCart(item) {
        this._items.push(item);
        this.saveCart();
    }
}
export default ShoppingCart; // eslint-disable-line