'use strict';

module.exports = function(app) {
	var itineraries = require('../controllers/itineraries.server.controller');
	var itinerariesPolicy = require('../policies/itineraries.server.policy');

	// Itineraries Routes
	app.route('/api/itineraries').all()
		.get(itineraries.list).all(itinerariesPolicy.isAllowed)
		.post(itineraries.create);

	app.route('/api/itineraries/:itineraryId').all(itinerariesPolicy.isAllowed)
		.get(itineraries.read)
		.put(itineraries.update)
		.delete(itineraries.delete);

	// Finish by binding the Itinerary middleware
	app.param('itineraryId', itineraries.itineraryByID);
};