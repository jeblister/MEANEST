'use strict';

// Configuring the Itineraries module
angular.module('itineraries').run(['Menus',
	function(Menus) {
		// Add the Itineraries dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Itineraries',
			state: 'itineraries',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'itineraries', {
			title: 'List Itineraries',
			state: 'itineraries.list'
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', 'itineraries', {
			title: 'Create Itinerary',
			state: 'itineraries.create'
		});
	}
]);