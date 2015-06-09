"use strict";

var express = require('express');

exports.initApp = function () {

    var app = express();
    app.use(express.static(__dirname + '/static'));
    console.log('ok!');
    return app
}

exports.initRouter = function (app) {
    var router = express.Router();
    app.use(router);
    return router;
}
