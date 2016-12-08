"use strict";
require('dotenv').config();
var Hapi = require("hapi");
var HapiAuthJwt = require('hapi-auth-jwt2');
var routes_1 = require("./routes");
var config_1 = require("../config");
var server = new Hapi.Server();
server.connection({
    host: 'localhost',
});
server.register([HapiAuthJwt], function (err) {
    if (process.env.NODE_ENV === 'local') {
        console.log('\n=======================================');
        console.log('**  Authentication is now disabled.  **');
        console.log('=======================================\n');
    }
    else {
        server.auth.strategy('token', 'jwt', true, {
            key: new Buffer(config_1.auth0ClientSecret, 'base64'),
            verifyOptions: {
                algorithms: ['HS256'],
                audience: config_1.auth0ClientId,
            },
            validateFunc: function (decoded, request, callback) {
                console.log('decoded:', decoded);
                return callback(null, true);
            }
        });
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
