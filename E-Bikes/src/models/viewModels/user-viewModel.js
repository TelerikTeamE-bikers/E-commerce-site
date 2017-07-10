class UserViewModel {
    constructor(username, password, shoppingCart) {
        this._username = username;
        this._password = password;
        this._shoppingCart = shoppingCart;
        this._shoppingHistory = [];
    }

    get username() {
        return this._username;
    }

    set username(value) {
        this._username = value.trim();
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value.trim().toString();
    }

    get shoppingCart() {
        return this._shoppingCart;
    }

    set shoppingCart(value) {
        this._shoppingCart = value;
    }
}

module.exports = {
    getUser(username, password) {
        return new UserViewModel(username, password);
    },
};
