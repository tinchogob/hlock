var express = require('express');
var Store = require('jfs');

var Location = require('./location_model.js')

var userDB = new Store("users", {
	pretty: true
});

var locationsDB = new Store("locations", {
	pretty: true
});

module.exports = exports = function createRouter() {

	var router = express.Router({caseSensitive: false, strict: false, mergeParams: true});

	router.get('/users/:username/location', getUserLocation);
	router.post('/users/:username/location', validateLocationPost, createUserLocation);

	console.log('Locations router created successfully');

	return router;
};

var getUserLocation = function getUserLocation(req, res, next) {
	
	var username = req.params.username;

	console.log('Getting user: %s location', username);
	
	usersDB.get(username, function(err, obj) {
		if (err) {
			return next({
				msg: 'User does not exists'
			});
		}

		return res.send(obj.location);
	});
};

var validateLocationPost = function validateLocationPost(req, res, next) {

	var username = req.params.username;
	var name = req.body.name;

	usersDB.get(username, function(err, obj) {
		if (err) {
			return next({
				msg: 'User does not exists'
			});
		}

		locationsDB.get(name, function(err, obj) {
			if (obj) {
				return next({
					msg: 'User location already exists',
					user: obj
				});
			}

			return next();
		});
	});
};

var createUserLocation = function createUserLocation(req, res, next) {

	var username = req.params.name;
	var name = req.body.name;

	var location = new Location(username, name);

	locationsDB.save(username+'_'+name, location, function(err) {
		if (err) return next(err);

		res.send({
			msg: 'Location created OK',
			user: location
		});
	});
};