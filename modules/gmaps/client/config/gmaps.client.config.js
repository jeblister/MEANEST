'use strict';

// Configuring the Maps module
angular.module('gmaps').run(['Menus',
	function(Menus) {
		// Add the Maps dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Maps',
			state: 'gmaps',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'gmaps', {
			title: 'List Maps',
			state: 'gmaps.list'
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', 'gmaps', {
			title: 'Create Map',
			state: 'gmaps.create'
		});
	}
]);