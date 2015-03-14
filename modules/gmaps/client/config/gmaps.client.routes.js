'use strict';

//Setting up route
angular.module('gmaps').config(['$stateProvider',
	function($stateProvider) {
		// Maps state routing
		$stateProvider.
		state('gmaps', {
			abstract: true,
			url: '/maps',
			template: '<ui-view/>'
		}).
		state('gmaps.list', {
			url: '',
			templateUrl: 'modules/gmaps/views/list-maps.client.view.html'
		}).
		state('gmaps.create', {
			url: '/create',
			templateUrl: 'modules/gmaps/views/create-map.client.view.html'
		}).
		state('gmaps.view', {
			url: '/:mapId',
			templateUrl: 'modules/gmaps/views/view-map.client.view.html'
		}).
		state('gmaps.edit', {
			url: '/:mapId/edit',
			templateUrl: 'modules/gmaps/views/edit-map.client.view.html'
		});
	}
]);