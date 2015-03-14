'use strict';

// Configuring the Calendars module
angular.module('calendars').run(['Menus',
	function(Menus) {
		// Add the Calendars dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Calendars',
			state: 'calendars',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'calendars', {
			title: 'List Calendars',
			state: 'calendars.list'
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', 'calendars', {
			title: 'Create Calendar',
			state: 'calendars.create'
		});
	}
]);