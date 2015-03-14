'use strict';

//Setting up route
angular.module('itineraries').config(['$stateProvider',
	function($stateProvider) {
		// Itineraries state routing
		$stateProvider.
		state('itineraries', {
			abstract: true,
			url: '/itineraries',
			template: '<ui-view/>'
		}).
		state('itineraries.list', {
			url: '',
			templateUrl: 'modules/itineraries/views/list-itineraries.client.view.html'
		}).
		state('itineraries.create', {
			url: '/create',
			templateUrl: 'modules/itineraries/views/create-itinerary.client.view.html'
		}).
		state('itineraries.view', {
			url: '/:itineraryId',
			templateUrl: 'modules/itineraries/views/view-itinerary.client.view.html'
		}).
		state('itineraries.edit', {
			url: '/:itineraryId/edit',
			templateUrl: 'modules/itineraries/views/edit-itinerary.client.view.html'
		});
	}
]);