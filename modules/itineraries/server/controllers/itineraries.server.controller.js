'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	Itinerary = mongoose.model('Itinerary'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Itinerary
 */
exports.create = function(req, res) {
	var itinerary = new Itinerary(req.body);
	itinerary.user = req.user;

	itinerary.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(itinerary);
		}
	});
};

/**
 * Show the current Itinerary
 */
exports.read = function(req, res) {
	res.jsonp(req.itinerary);
};

/**
 * Update a Itinerary
 */
exports.update = function(req, res) {
	var itinerary = req.itinerary ;

	itinerary = _.extend(itinerary , req.body);

	itinerary.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(itinerary);
		}
	});
};

/**
 * Delete an Itinerary
 */
exports.delete = function(req, res) {
	var itinerary = req.itinerary ;

	itinerary.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(itinerary);
		}
	});
};

/**
 * List of Itineraries
 */
exports.list = function(req, res) { Itinerary.find().sort('-created').populate('user', 'displayName').exec(function(err, itineraries) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(itineraries);
		}
	});
};

/**
 * Itinerary middleware
 */
exports.itineraryByID = function(req, res, next, id) { Itinerary.findById(id).populate('user', 'displayName').exec(function(err, itinerary) {
		if (err) return next(err);
		if (! itinerary) return next(new Error('Failed to load Itinerary ' + id));
		req.itinerary = itinerary ;
		next();
	});
};