"use strict";
var admin = require("firebase-admin");
var uuid = require('uuid');
var config_1 = require("../../config");
var firebaseApp;
function getFirebaseApp() {
    var name = uuid();
    if (!firebaseApp) {
        firebaseApp = admin.initializeApp({
            credential: admin.credential.cert(config_1.firebaseServiceAccountKeyJson),
            databaseURL: config_1.firebaseDatabaseURL,
        }, name);
    }
    return firebaseApp;
}
exports.getFirebaseApp = getFirebaseApp;
