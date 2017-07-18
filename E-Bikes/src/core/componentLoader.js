const fs = require('fs');
const path = require('path');

module.exports = {
    initializeRoutes(app, controllers) {
        fs.readdirSync('./src/routes')
            .filter((x) => x.includes('-router'))
            .forEach((file) => {
                console.log('Loading router:', '../routes/' + file);

                require(path.join('../routes/', file))(app, controllers);
            });

        console.log('All routers loaded.');
        console.log();
    },
    initializeControllers(data) {
        const controllers = {};

        fs.readdirSync('./src/controllers')
            .filter((x) => x.includes('-controller'))
            .forEach((file) => {
                //console.log("f: ", file)
                const controllerModule = require(path.join('../controllers/', file))(data);
                //console.log(1, controllerModule)
                console.log('Loading controller:', '../controllers/' + file);

                controllers[file.substring(0, file.indexOf('-'))] = controllerModule;
            });

        //console.log(2, controllers)
        console.log('All controllers loaded.');
        console.log();

        return controllers;
    },
    initializeRepositories(contexts, constants, errorHandler) {
        let repositories = {};

        fs.readdirSync('./src/data/repositories')
            .filter(x => x.includes('-repository'))
            .forEach(file => {
                //console.log("f: ", file)
                let repositoryModule = require(path.join('../data/repositories', file))
                    (contexts,
                    constants,
                    errorHandler);
                //console.log(1, controllerModule)
                console.log("Loading repository:", '../data/repositories/' + file);

                repositories[file.substring(0, file.indexOf('-'))] = repositoryModule;
            });

        //console.log(2, controllers)
        console.log("All repositories loaded.");
        console.log();

        return repositories;
    },
    initializeContexts() {
        let contexts = {};

        fs.readdirSync('./src/data/dbContexts')
            .filter(x => x.includes('-dbContext'))
            .forEach(file => {
                let contextModule = require(path.join('../data/dbContexts', file));
                console.log("Loading context:", '../data/dbContexts/' + file);

                contexts[file.substring(0, file.indexOf('-'))] = contextModule;
            });

        console.log("All contexts loaded.");
        console.log();

        return contexts;
    }
};