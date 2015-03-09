'use strict';

module.exports = function(app) {
	var gmaps = require('../controllers/gmaps.server.controller');
	var gmapsPolicy = require('../policies/gmaps.server.policy');

	// Maps Routes
	app.route('/api/gmaps').all()
		.get(gmaps.list).all(gmapsPolicy.isAllowed)
		.post(gmaps.create);

	app.route('/api/gmaps/:gmapId').all(gmapsPolicy.isAllowed)
		.get(gmaps.read)
		.put(gmaps.update)
		.delete(gmaps.delete);

	// Finish by binding the Map middleware
	app.param('gmapId', gmaps.gmapByID);
};