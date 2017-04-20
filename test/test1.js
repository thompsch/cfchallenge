var assert = require('assert');
var myCache = require('../cache')
var proxies = require('../proxies')
var td = require('./testdata')

td.getTestData()

proxies.buildCustomRaceObject()
var result = myCache.cache.get(myCache.cacheKeys.CUSTOM)

console.log('*****', result)

describe('Testing the buildCustomRaceObject() function.', function() {
	describe('the combined object...', function() {
		it ('should contain 3 races', function() {
			assert.equal(1, result.recentRaces.length)
			assert.equal(1, result.upcomingRaces.length)
			assert.equal(1, result.activeRaces.length)
		})
	})
	describe('the activeRace object...', function() {

		var activeRace = result.activeRaces[0]

		it('should have the right id', function() {
			assert.equal(activeRace.id, '3')
		})
		it('should have a posttime', function() {
			assert.equal(activeRace.postTime, '2017-04-19T23:02:00-07:00')
		})
		it('should have odds', function() {
			assert.equal(activeRace.hasOdds, true)
			assert.equal(activeRace.hasML, true)
		})
		it('should have 1 entry', function() {
			assert.equal(1, activeRace.entries.length)
		})
		it('should have complete entries', function() {
			assert.equal(activeRace.entries[0].ProgramNumber, '101')
			assert.equal(activeRace.entries[0].odds, '8/5')

			assert.deepEqual(activeRace.entries[0].result, undefined)
		})
		it('should not have a results object', function() {
			assert.equal(activeRace.hasResults, false)
			assert.deepEqual(activeRace.results, { WN: [], PL: [], SH: [] })
			})
	})

	describe('the upcomingRace object...', function() {

		var upcomingRace = result.upcomingRaces[0]

		it('should have the right id', function() {
			assert.equal(upcomingRace.id, '2')
		})
		it('should have a posttime', function() {
			assert.equal(upcomingRace.postTime, '2017-04-18T23:02:00-07:00')
		})
		it('should have odds', function() {
			assert.equal(upcomingRace.hasOdds, false)
			assert.equal(upcomingRace.hasML, false)
		})
		it('should have 1 entry', function() {
			assert.equal(upcomingRace.entries.length, 1)
		})
		it('should have complete entries', function() {
			assert.equal(upcomingRace.entries[0].ProgramNumber, '100')
			assert.equal(upcomingRace.entries[0].odds, undefined)
			assert.deepEqual(upcomingRace.entries[0].result, undefined)
		})
		it('should not have a results object', function() {
			assert.equal(upcomingRace.hasResults, false)
			assert.deepEqual(upcomingRace.results, { WN: [], PL: [], SH: [] })
		})
	})

	describe('the recentRace object...', function() {

		var recentRace = result.recentRaces[0]

		it('should have the right id', function() {
			assert.equal(recentRace.id, '1')
		})
		it('should have a posttime', function() {
			assert.equal(recentRace.postTime, '2017-04-17T09:45:00-07:00')
		})
		it('should have odds', function() {
			assert.equal(recentRace.hasOdds, false)
			assert.equal(recentRace.hasML, true)
		})
		it('should have 10 entries', function() {
			assert.equal(10, recentRace.entries.length)
		})
		it('should have complete entries', function() {
			assert.equal(recentRace.entries[0].ProgramNumber, '1')
			assert.equal(recentRace.entries[0].odds, undefined)

			assert.deepEqual({ PoolType: 'SH', Base: '1', Value: '3.45' }, recentRace.entries[0].result)
		})
		it('should have a results object', function() {
			assert.equal(recentRace.hasResults, true)
			assert.equal(recentRace.results.WN[0].horse.ProgramNumber, '5')
			assert.equal(recentRace.results.WN[0].WN, '2.4')
			assert.equal(recentRace.results.WN[0].PL, '3.5')
			assert.equal(recentRace.results.WN[0].SH, '4.5')
			})
	})


})
