'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName)
	.config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.html5Mode(true).hashPrefix('!');
	}
	
	])
	/*.config(function($mdThemingProvider) {
	  $mdThemingProvider.theme('default')
	    .primaryPalette('pink')
	    .accentPalette('orange');
	})
	;*/
	.config(function($mdThemingProvider) {
	  $mdThemingProvider.theme('default')
	    .primaryPalette('pink', {
	      'default': '400', // by default use shade 400 from the pink palette for primary intentions
	      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
	      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
	      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
	    })
	    // If you specify less than all of the keys, it will inherit from the
	    // default shades
	    .accentPalette('purple', {
	      'default': '200' // use shade 200 for default, and keep all other shades the same
	    });
	});


//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
