const constants = require('./src/common/constants');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./configuration/config.json', 'utf8'));
const app = require('./src/core/engine')(config);

app.listen(constants.APP_PORT, () => {
    console.log('----|  Startup log  |----');
    console.log(`   >Started on: ${new Date().toLocaleTimeString()}`);
    console.log(`   >Environment: ${process.env.ENV_MODE}`);
    console.log(`   >App running at port: ${constants.APP_PORT}`);
});