//const crypto = require('crypto-js');
const constants = require('../../common/constants');
//const validator = require('../common/validator');

class Error {
    constructor(content) {
        this._content = content;
        this._createdOn = new Date().toLocaleTimeString();
    }

    get content() {
        return this._content;
    }

    set content(value) {
        // validator.validateStringLength(value,
        //     constants.MIN_USERNAME_LENGTH, constants.MAX_USERNAME_LENGTH);

        this._content = value.trim();
    }

    get createdOn() {
        return this._createdOn;
    }
}

module.exports = {
    getError(content) {
        return new Error(content);
    },
};