const constants = require('./src/common/constants');
const app = require('./src/core/engine')('data');
const componentLoader = require('./src/core/componentLoader');

const unitOfWork = componentLoader.initializeRepositories();
const controllers = componentLoader.initializeControllers(unitOfWork);

componentLoader.initializeRoutes(app, controllers);

app.listen(constants.APP_PORT, () => {
    console.log('----|  Startup log  |----');
    console.log(`   >Started on: ${new Date().toLocaleTimeString()}`);
    console.log(`   >Environment: ${process.env.ENV_MODE}`);
    console.log(`   >App running at port: ${constants.APP_PORT}`);
});