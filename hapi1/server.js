"use strict";
var path = require("path");
var Hapi = require("hapi");
var Inert = require('inert');
var routes_1 = require("./routes");
var server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: path.join(__dirname, 'public')
            },
        }
    }
});
server.connection({
    host: 'localhost',
});
server.register([Inert], function (err) {
    if (err) {
        throw err;
    }
});
server.route(routes_1.routes);
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
