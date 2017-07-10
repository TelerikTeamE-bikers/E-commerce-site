class UserViewModel {
    constructor(username, password) {
        this.username = username;
        this.password = password;
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
}

module.exports = {
    getUser(username, password) {
        return new UserViewModel(username, password);
    },
};
