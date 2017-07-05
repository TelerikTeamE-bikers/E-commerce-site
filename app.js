const constants = require('./src/common/constants');
const app = require('./src/core/core')('data');;

app.listen(constants.APP_PORT, () => {
    console.log('  >Log--' + new Date().toLocaleTimeString() +
        ` :: App running at :` + constants.APP_PORT);
});

module.exports.app = app;
//