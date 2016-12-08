"use strict";
var axios_1 = require("axios");
function createAxios(baseUri, req) {
    var query = Object.keys(req.query).reduce(function (p, key) {
        p.push(key + '=' + encodeURIComponent(req.query[key]));
        return p;
    }, []);
    var url = baseUri + (req.params.segments ? '/' + req.params.segments : '') + (query.length ? '?' + query.join('&') : '');
    var options = {
        method: req.method,
        headers: req.headers,
        data: req.rawBody,
    };
    console.log('\nfetch url:', url);
    console.log('fetch options:', options);
    return axios_1.default(url, options);
}
exports.createAxios = createAxios;
