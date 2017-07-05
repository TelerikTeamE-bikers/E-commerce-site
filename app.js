const constants = require('./src/common/constants');
const data = require('./src/data/data');
const app = require('./src/core/core')(data);;

app.listen(constants.APP_PORT, () => {
    console.log('----|  Startup log  |---');
    console.log(`   >Started on: ${new Date().toLocaleTimeString()}`);
    console.log(`   >Environment: ${process.env.ENV_MODE}`);
    console.log(`   >App running at port: ${constants.APP_PORT}`);
});