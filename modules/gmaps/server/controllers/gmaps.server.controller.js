'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	Gmap = mongoose.model('Gmap'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Map
 */
exports.create = function(req, res) {
	var gmap = new Gmap(req.body);
	gmap.user = req.user;

	gmap.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(gmap);
		}
	});
};

/**
 * Show the current Map
 */
exports.read = function(req, res) {
	res.jsonp(req.gmap);
};

/**
 * Update a Map
 */
exports.update = function(req, res) {
	var gmap = req.gmap ;

	gmap = _.extend(gmap , req.body);

	gmap.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(gmap);
		}
	});
};

/**
 * Delete an Map
 */
exports.delete = function(req, res) {
	var gmap = req.gmap ;

	gmap.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(gmap);
		}
	});
};

/**
 * List of Maps
 */
exports.list = function(req, res) { Gmap.find().sort('-created').populate('user', 'displayName').exec(function(err, gmaps) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(gmaps);
		}
	});
};

/**
 * Map middleware
 */
exports.gmapByID = function(req, res, next, id) { Gmap.findById(id).populate('user', 'displayName').exec(function(err, gmap) {
		if (err) return next(err);
		if (! gmap) return next(new Error('Failed to load Map ' + id));
		req.gmap = gmap ;
		next();
	});
};