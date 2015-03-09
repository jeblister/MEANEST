'use strict';

describe('Gmaps E2E Tests:', function() {
	describe('Test Gmaps page', function() {
		it('Should not include new Gmaps', function() {
			browser.get('http://localhost:3000/#!/gmaps');
			expect(element.all(by.repeater('gmap in gmaps')).count()).toEqual(0);
		});
	});
});
