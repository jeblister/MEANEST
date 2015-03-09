'use strict';

// Maps controller
angular.module('gmaps').controller('MapsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Gmaps',
	function($scope, $stateParams, $location, Authentication, Gmaps ) {
		$scope.authentication = Authentication;

		// Create new Map
		$scope.create = function() {
			// Create new Map object
			var gmap = new Gmaps ({
				name: this.name
			});

			// Redirect after save
			gmap.$save(function(response) {
				$location.path('gmaps/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Map
		$scope.remove = function( gmap ) {
			if ( gmap ) { gmap.$remove();

				for (var i in $scope.gmaps ) {
					if ($scope.gmaps [i] === gmap ) {
						$scope.gmaps.splice(i, 1);
					}
				}
			} else {
				$scope.gmap.$remove(function() {
					$location.path('gmaps');
				});
			}
		};

		// Update existing Map
		$scope.update = function() {
			var gmap = $scope.gmap ;

			gmap.$update(function() {
				$location.path('gmaps/' + gmap._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Maps
		$scope.find = function() {
			$scope.gmaps = Gmaps.query();
		};

		// Find existing Map
		$scope.findOne = function() {
			$scope.gmap = Gmaps.get({ 
				gmapId: $stateParams.gmapId
			});
		};
	}
]);