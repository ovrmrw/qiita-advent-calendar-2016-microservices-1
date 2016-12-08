"use strict";
var Hapi = require("hapi");
var server = new Hapi.Server();
server.connection({
    host: 'localhost'
});
server.route([
    {
        method: 'GET',
        path: '/',
        handler: function (req, reply) {
            try {
                var message = 'Hello world.';
                reply({ message: message });
            }
            catch (error) {
                reply({ error: error }).code(500);
            }
        }
    },
    {
        method: 'GET',
        path: '/{name}',
        handler: function (req, reply) {
            try {
                var message = 'Hello world, ' + req.params['name'];
                reply({ message: message });
            }
            catch (error) {
                reply({ error: error }).code(500);
            }
        }
    }
]);
var uri;
function createUri() {
    return new Promise(function (resolve, reject) {
        if (uri) {
            resolve(uri);
        }
        else {
            server.start(function (err) {
                if (err) {
                    reject(err);
                }
                uri = server.info.uri;
                console.log('Server running at:', uri);
                resolve(uri);
            });
        }
    });
}
exports.createUri = createUri;
