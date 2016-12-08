"use strict";
var path = require("path");
var Hapi = require("hapi");
var Inert = require('inert');
var server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: path.join(__dirname, 'dist')
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
/**
 * req.params['param']に含まれる$を.に変換してファイルを返す。
 * (例) hoge$bundle$js --> hoge.bundle.js
 * Azure Functionsのrouteは.を含むと総じてNot Foundとなるためやむを得ずこうした。
 */
server.route({
    method: 'GET',
    path: '/{param*}',
    handler: function (req, reply) {
        var filename = (req.params['param'] || 'index.html').replace(/\$/g, '.');
        reply.file(filename);
    }
});
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
