"use strict";
var express_1 = require("express");
var router = express_1.Router();
var repository_1 = require("../lib/repository");
exports.routes = router;
router.all('/', function (req, res) {
    try {
        var message = repository_1.createWelcomeMessage();
        res.set('Content-Type', 'text/plain');
        res.send(message);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
router.all('/hello', function (req, res) {
    try {
        var name_1 = req.body && req.body.name ? req.body.name : req.query.name;
        var message = repository_1.createHelloMessage(name_1);
        res.json({ message: message });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
