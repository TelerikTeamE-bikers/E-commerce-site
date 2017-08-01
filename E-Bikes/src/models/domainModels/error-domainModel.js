const constants = require('../../common/constants');

class Error {
    constructor(content) {
        this._content = content;
        this._createdOn = new Date().toLocaleTimeString();
    }

    get content() {
        return this._content;
    }

    set content(value) {
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
}; // eslint-disable-line