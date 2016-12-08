"use strict";
var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var routes_1 = require("./routes");
var app = express();
var port = 0; // dynamic
var host = 'localhost';
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(routes_1.routes);
var uri;
function createUri() {
    return new Promise(function (resolve, reject) {
        if (uri) {
            resolve(uri);
        }
        else {
            var server_1 = app.listen(port, host, function (err) {
                if (err) {
                    reject(err);
                }
                uri = 'http://' + server_1.address().address + ':' + server_1.address().port;
                console.log('Server running at:', uri);
                resolve(uri);
            });
        }
    });
}
exports.createUri = createUri;
