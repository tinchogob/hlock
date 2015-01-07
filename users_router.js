var express = require('express');
var Store = require('jfs');

var User = require('./users_model.js')

var userDB = new Store("users", {
	pretty: true
});

module.exports = exports = function createRouter() {

	var router = express.Router({caseSensitive: false, strict: false, mergeParams: true});

	router.get('/users/:username', getUser);
	router.post('/users', validatePost, createUser);
	router.put('/users/:username', validatePut, editUser);

	console.log('Users router created successfully');

	return router;
};

var getUser = function getUser(req, res, next) {
	
	var username = req.params.username;

	console.log('Getting user: %s', username);
	
	userDB.get(username, function(err, obj) {
		if (err) {
			return next({
				msg: 'User does not exists'
			});
		}

		return res.send(obj);
	});
};

var validatePost = function validatePost(req, res, next) {

	var username = req.body.name;

	userDB.get(username, function(err, obj) {
		if (obj) {
			return next({
				msg: 'User already exists',
				user: obj
			});
		}

		return next();
	});

};

var createUser = function createUser(req, res, next) {

	var username = req.body.name;

	var user = new User(username);

	userDB.save(username, user, function(err) {
		if (err) return next(err);

		res.send({
			msg: 'User created OK',
			user: user
		});
	});
};

var validatePut = function validatePut(req, res, next) {

	var username = req.params.username;

	userDB.get(username, function(err, obj) {
		if (err) {
			log(err);
			return next({
				msg: 'User does not exists'
			});
		}

		return next();
	});

};

var editUser = function editUser(req, res, next) {

	var username = req.params.username;

	userDB.get(username, function(err, obj) {
		if (err) return next(err);

		Object.keys(req.body).forEach(function(key) {
			if (obj[key]) {
				obj[key] = req.body[key];
			}
		});

		userDB.save(username, obj, function(err) {
			if (err) return next(err);

			res.send({
				msg: 'User edit OK',
				user: obj
			});
		});
	});
};