'use strict';

//Maps service used to communicate Maps REST endpoints
angular.module('mgaps').factory('Gmaps', ['$resource',
	function($resource) {
		return $resource('api/gmaps/:gmapId', { gmapId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);