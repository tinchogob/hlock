var express = require('express');
var bodyParser = require('body-parser');

var UsersRouter = require('./users_router.js');
var LocationRouter = require('./location_router.js');

var log = console.log

var app = new express();

app.use(bodyParser.json());
app.use(new UsersRouter());
app.use(new LocationRouter());

app.use(function error_handler(error, req, res, next) {
	res.status(500).json(error);
})

module.exports = exports = app;