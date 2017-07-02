//const crypto = require('crypto-js');
const constants = require('../common/constants');
//const validator = require('../common/validator');

class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    get username() {
        return this._username;
    }

    set username(value) {
        // validator.validateStringLength(value,
        //     constants.MIN_USERNAME_LENGTH, constants.MAX_USERNAME_LENGTH);

        this._username = value.trim();
    }

    get password() {
        return this._password;
    }

    set password(value) {
        // validator.validateStringLength(value,
        //     constants.MIN_PASSWORD_LENGTH, constants.MAX_PASSWORD_LENGTH);

        //this._password = new crypto.SHA1(value.trim()).toString();
        this._password = value.trim().toString();
    }
}

module.exports = {
    getUser(username, password) {
        return new User(username, password);
    },
};
