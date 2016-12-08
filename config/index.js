"use strict";
var fs = require("fs");
var path = require("path");
var SECRET_KEY = path.join(__dirname, '..', 'secret-key');
var appSecretJsonPath = path.join(SECRET_KEY, 'app.secret.json');
var firebaseServiceAccountKeyJsonPath = path.join(SECRET_KEY, 'Firebase-as-a-Store-2-fddea9cd9c72.json');
// const appSecretKeyJson = require('../secret-key/app.secret.json');
// const firebaseServiceAccountKeyJson = require('../secret-key/Firebase-as-a-Store-2-fddea9cd9c72.json');
var appSecretKeyJson = JSON.parse(fs.readFileSync(appSecretJsonPath, 'utf8'));
var firebaseServiceAccountKeyJson = JSON.parse(fs.readFileSync(firebaseServiceAccountKeyJsonPath, 'utf8'));
exports.firebaseServiceAccountKeyJson = firebaseServiceAccountKeyJson;
[appSecretKeyJson, firebaseServiceAccountKeyJson].forEach(function (json) {
    if (!json['___WARNING___']) {
        throw new Error('Json file for config is incorrect.');
    }
});
exports.auth0ClientId = appSecretKeyJson.auth0.clientId;
exports.auth0ClientSecret = appSecretKeyJson.auth0.clientSecret;
exports.auth0Domain = appSecretKeyJson.auth0.domain;
if ([exports.auth0ClientId, exports.auth0ClientSecret, exports.auth0Domain].some(function (key) { return !key; })) {
    console.error('Auth0 env keys:', { auth0ClientId: exports.auth0ClientId, auth0ClientSecret: exports.auth0ClientSecret, auth0Domain: exports.auth0Domain });
    throw new Error('Env keys for Auth0 is not corrected.');
}
exports.firebaseDatabaseURL = appSecretKeyJson.firebase.databaseUrl;
if ([exports.firebaseDatabaseURL].some(function (key) { return !key; })) {
    console.error('Firebase env keys:', { firebaseDatabaseURL: exports.firebaseDatabaseURL });
    throw new Error('Env keys for Firebase are not corrected.');
}
