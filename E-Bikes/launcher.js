/* globals process */
const constants = require('./src/common/constants');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./configuration/config.json', 'utf8'));
const componentLoader = require('./src/core/modules/componentLoader');
const errorHandler = require('./src/core/modules/errorHandler');
const socket = require('socket.io');
const engine = require('./src/core/engine');

engine.init(config, constants, errorHandler, componentLoader)
    .then((app) => {
        const server = app.listen(constants.APP_PORT, () => {
            console.log('----|  Startup log  |----');
            console.log(`   >Started on: ${new Date().toLocaleTimeString()}`);
            // eslint-disable-next-line no-process-env
            console.log(`   >Environment: ${process.env.ENV_MODE}`);
            console.log(`   >App running at port: ${constants.APP_PORT}`);
        });

        return server;
    })
    .then((server) => {
        // Socket setup
        const io = socket(server);

        io.on('connection', (socket) => {
            console.log('Websocket connection has been made', socket.id);

            // Handle chat event
            socket.on('chat', (data) => {
                io.sockets.emit('chat', data);
            });

            socket.on('typing', (data) => {
                socket.broadcast.emit('typing', data);
            });
        });
    });