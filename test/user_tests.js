var should = require('should');
var supertest = require('supertest');

var app = require('../app.js');

describe('users api', function() {
	
	var app_server;
	var test_server;

	before(function() {
		app_server = app.listen(8080);
		test_server = supertest(app_server);
	});

	after(function() {
		app_server.close();
	});

	describe('post', function() {
		it('should create the user', function(done) {
			var user = {name: 'test_user', location: {}, friends: []};
			test_server.post('/users/test_user').send(user).expect(200).end(done);
		});
		it('should not create the user if username already exists', function(done) {
			var user = {name: 'test_user', location: {}, friends: []};
			test_server.post('/users/test_user').send(user).expect(500).end(done);
		});
	});

	describe('get', function() {
		it('should return the user', function(done) {
			test_server.get('/users/test_user').expect(200).end(done);
		});

		it('should return not found if the requested does not exists');
	});
	describe('put', function() {
		it('should edit the user');
		it('should not edit the user if the user does not exist');
	});
});