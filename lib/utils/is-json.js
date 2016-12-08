"use strict";
function isJson(text) {
    var result = false;
    if (text.match(/^{.*}$/)) {
        result = true;
    }
    return result;
}
exports.isJson = isJson;
function isHtml(text) {
    var result = false;
    if (text.match(/<html.*>/)) {
        result = true;
    }
    return result;
}
exports.isHtml = isHtml;
function isPicture(text) {
    var result = false;
    if (text.match(/PNG/)) {
        result = true;
    }
    return result;
}
exports.isPicture = isPicture;
function convertToBody(body, encoding) {
    // This may be removed on Azure Function native support for Buffer
    // https://github.com/Azure/azure-webjobs-sdk-script/issues/814
    // https://github.com/Azure/azure-webjobs-sdk-script/pull/781
    return Buffer.isBuffer(body)
        ? body.toString(encoding)
        : body;
}
exports.convertToBody = convertToBody;
