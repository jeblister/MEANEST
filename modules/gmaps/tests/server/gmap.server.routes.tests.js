'use strict';

var should = require('should'),
	request = require('supertest'),
	path = require('path'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Gmap = mongoose.model('Gmap'),
	express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, gmap;

/**
 * Map routes tests
 */
describe('Gmap CRUD tests', function() {
	before(function(done) {
		// Get application
		app = express.init(mongoose);
		agent = request.agent(app);

		done();
	});

	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Map
		user.save(function() {
			gmap = {
				name: 'Gmap Name'
			};

			done();
		});
	});

	it('should be able to save Gmap instance if logged in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Map
				agent.post('/api/gmaps')
					.send(gmap)
					.expect(200)
					.end(function(gmapSaveErr, gmapSaveRes) {
						// Handle Map save error
						if (gmapSaveErr) done(gmapSaveErr);

						// Get a list of Maps
						agent.get('/api/gmaps')
							.end(function(gmapsGetErr, gmapsGetRes) {
								// Handle Map save error
								if (gmapsGetErr) done(gmapsGetErr);

								// Get Maps list
								var gmaps = gmapsGetRes.body;

								// Set assertions
								(gmaps[0].user._id).should.equal(userId);
								(gmaps[0].name).should.match('Gmap Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Gmap instance if not logged in', function(done) {
		agent.post('/api/gmaps')
			.send(gmap)
			.expect(403)
			.end(function(gmapSaveErr, gmapSaveRes) {
				// Call the assertion callback
				done(gmapSaveErr);
			});
	});

	it('should not be able to save Gmap instance if no name is provided', function(done) {
		// Invalidate name field
		gmap.name = '';

		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Map
				agent.post('/api/gmaps')
					.send(gmap)
					.expect(400)
					.end(function(gmapSaveErr, gmapSaveRes) {
						// Set message assertion
						(gmapSaveRes.body.message).should.match('Please fill Gmap name');
						
						// Handle Map save error
						done(gmapSaveErr);
					});
			});
	});

	it('should be able to update Gmap instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Map
				agent.post('/api/gmaps')
					.send(gmap)
					.expect(200)
					.end(function(gmapSaveErr, gmapSaveRes) {
						// Handle Map save error
						if (gmapSaveErr) done(gmapSaveErr);

						// Update Map name
						gmap.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Map
						agent.put('/api/gmaps/' + gmapSaveRes.body._id)
							.send(gmap)
							.expect(200)
							.end(function(gmapUpdateErr, gmapUpdateRes) {
								// Handle Map update error
								if (gmapUpdateErr) done(gmapUpdateErr);

								// Set assertions
								(gmapUpdateRes.body._id).should.equal(gmapSaveRes.body._id);
								(gmapUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Gmaps if not signed in', function(done) {
		// Create new Map model instance
		var gmapObj = new Gmap(gmap);

		// Save the Map
		gmapObj.save(function() {
			// Request Maps
			request(app).get('/api/gmaps')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Map if not signed in', function(done) {
		// Create new Map model instance
		var gmapObj = new Gmap(gmap);

		// Save the Map
		gmapObj.save(function() {
			request(app).get('/api/gmaps/' + gmapObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', gmap.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Gmap instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Map
				agent.post('/api/gmaps')
					.send(gmap)
					.expect(200)
					.end(function(gmapSaveErr, gmapSaveRes) {
						// Handle Map save error
						if (gmapSaveErr) done(gmapSaveErr);

						// Delete existing Map
						agent.delete('/api/gmaps/' + gmapSaveRes.body._id)
							.send(gmap)
							.expect(200)
							.end(function(gmapDeleteErr, gmapDeleteRes) {
								// Handle Map error error
								if (gmapDeleteErr) done(gmapDeleteErr);

								// Set assertions
								(gmapDeleteRes.body._id).should.equal(gmapSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Gmap instance if not signed in', function(done) {
		// Set Map user 
		gmap.user = user;

		// Create new Map model instance
		var gmapObj = new Gmap(gmap);

		// Save the Map
		gmapObj.save(function() {
			// Try deleting Map
			request(app).delete('/api/gmaps/' + gmapObj._id)
			.expect(403)
			.end(function(gmapDeleteErr, gmapDeleteRes) {
				// Set message assertion
				(gmapDeleteRes.body.message).should.match('User is not authorized');

				// Handle Map error error
				done(gmapDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			Gmap.remove().exec(function(){
				done();
			});
		});
	});
});
