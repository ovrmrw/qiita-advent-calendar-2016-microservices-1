"use strict";
var repository_1 = require("../lib/repository");
var APPLICATION_JSON = 'application/json';
var TEXT_PLAIN = 'text/plain';
exports.routes = [];
exports.routes.push({
    method: ['GET', 'POST'],
    path: '/',
    handler: function (req, reply) {
        try {
            var message = repository_1.createWelcomeMessage();
            reply(message).header('content-type', TEXT_PLAIN);
        }
        catch (error) {
            reply({ error: error }).code(500);
        }
    }
});
exports.routes.push({
    method: ['GET', 'POST'],
    path: '/hello',
    handler: function (req, reply) {
        try {
            var name_1 = req.payload && req.payload.name ? req.payload.name : req.query.name;
            var message = repository_1.createHelloMessage(name_1);
            reply({ message: message });
        }
        catch (error) {
            reply({ error: error }).code(500);
        }
    }
});
exports.routes.push({
    method: 'GET',
    path: '/public/{param*}',
    handler: {
        directory: {
            path: '.',
            index: true,
        }
    }
});
