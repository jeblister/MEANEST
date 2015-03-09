'use strict';

describe('Itineraries E2E Tests:', function() {
	describe('Test Itineraries page', function() {
		it('Should not include new Itineraries', function() {
			browser.get('http://localhost:3000/#!/itineraries');
			expect(element.all(by.repeater('itinerary in itineraries')).count()).toEqual(0);
		});
	});
});
