'use strict';

(function() {
	// Maps Controller Spec
	describe('Gmaps Controller Tests', function() {
		// Initialize global variables
		var GmapsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Maps controller.
			GmapsController = $controller('GmapsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Gmap object fetched from XHR', inject(function(Gmaps) {
			// Create sample Map using the Maps service
			var sampleGmap = new Gmaps({
				name: 'New Gmap'
			});

			// Create a sample Maps array that includes the new Map
			var sampleGmaps = [sampleGmap];

			// Set GET response
			$httpBackend.expectGET('api/gmaps').respond(sampleGmaps);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.gmaps).toEqualData(sampleGmaps);
		}));

		it('$scope.findOne() should create an array with one Gmap object fetched from XHR using a gmapId URL parameter', inject(function(Gmaps) {
			// Define a sample Map object
			var sampleGmap = new Gmaps({
				name: 'New Gmap'
			});

			// Set the URL parameter
			$stateParams.mapId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/api\/gmaps\/([0-9a-fA-F]{24})$/).respond(sampleGmap);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.map).toEqualData(sampleGmap);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Gmaps) {
			// Create a sample Map object
			var sampleGmapPostData = new Gmaps({
				name: 'New Gmap'
			});

			// Create a sample Map response
			var sampleGmapResponse = new Gmaps({
				_id: '525cf20451979dea2c000001',
				name: 'New Gmap'
			});

			// Fixture mock form input values
			scope.name = 'New Gmap';

			// Set POST response
			$httpBackend.expectPOST('api/maps', sampleGmapPostData).respond(sampleGmapResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Map was created
			expect($location.path()).toBe('/gmaps/' + sampleGmapResponse._id);
		}));

		it('$scope.update() should update a valid Gmap', inject(function(Gmaps) {
			// Define a sample Map put data
			var sampleGmapPutData = new Gmaps({
				_id: '525cf20451979dea2c000001',
				name: 'New Gmap'
			});

			// Mock Map in scope
			scope.gmap = sampleGmapPutData;

			// Set PUT response
			$httpBackend.expectPUT(/api\/gmaps\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/gmaps/' + sampleGmapPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid gmapId and remove the Gmap from the scope', inject(function(Gmaps) {
			// Create new Map object
			var sampleGmap = new Gmaps({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Maps array and include the Map
			scope.gmaps = [sampleGmap];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/api\/gmaps\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleGmap);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.gmaps.length).toBe(0);
		}));
	});
}());