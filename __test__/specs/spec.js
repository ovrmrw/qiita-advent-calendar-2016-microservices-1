"use strict";
var assert = require("power-assert");
var repository_1 = require("../../lib/repository");
describe('Unit Test', function () {
    it('createWelcomeMessage', function () {
        var result = repository_1.createWelcomeMessage();
        console.log(result);
        assert(result.includes('This is root.'));
    });
    it('createHelloMessage', function () {
        var result = repository_1.createHelloMessage();
        console.log(result);
        assert(result.includes('Hello world, you.'));
    });
    it('createHelloMessage', function () {
        var name = 'foo';
        var result = repository_1.createHelloMessage(name);
        console.log(result);
        assert(result.includes('Hello world, foo.'));
    });
});
