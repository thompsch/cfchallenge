var races = require('./races')
var entries = require('./entries')
var results = require('./results')
var odds = require('./odds')
var myCache = require('../cache')
var async = require('async')
require ('dotenv').config()

//TODO: clean up and use async and/or warterfall...
exports.fetchAllData = function () {


	async.waterfall([
	    races.fetchAllRaces,
	    results.fetchAllResults,
	    entries.fetchAllEntries,
	    odds.fetchAllOdds,
	    buildCustomRaceObject
	], function (err, result) {
		console.log('DONE', result)
	   
	});


}

function buildCustomRaceObject(callback) {
	
	var customRaceObject = {}
	var oddsLookup = []
	var resultsLookup = []

	var allRaces = myCache.cache.get(myCache.cacheKeys.ALLRACES)

	for (var r = 0; r < allRaces.length; r++) {
		var race = allRaces[r]
		console.log('Processing race', race)
		
		//create lookup tables
		var odds = myCache.cache.get(myCache.cacheKeys.ODDS + race.RaceNum)

		if (odds != null && odds.OddsResponse.WinOdds.Entries != null ) {
			customRaceObject.hasOdds = true
			var eTemp = odds.OddsResponse.WinOdds.Entries.Entry
			for (var odd = 0; odd < eTemp.length; odd ++) {
				oddsLookup[eTemp[odd].ProgramNumber] = eTemp[odd].TextOdds
			}
		} else {
			customRaceObject.hasOdds = false
		}

		var results = myCache.cache.get(myCache.cacheKeys.ONERESULT + race.RaceNum)

		if(results != null && results.ResultsResponse.Entries != null && results.ResultsResponse.Entries.Entry.length > 0) {
				var rTemp = results.ResultsResponse.Entries.Entry
				for (var r = 0; r < rTemp.length; r ++) {
					var pool = rTemp[r].Pools.Pool
					resultsLookup[rTemp[r].ProgramNumber] = pool
				}
		}

		customRaceObject.id = race.RaceNum
		customRaceObject.postTime = race.PostTime
		customRaceObject.entries = []

		var entries = myCache.cache.get(myCache.cacheKeys.ONEENTRY + race.RaceNum)

		for (var e = 0; e < entries.Entries.length; e ++) {
			var newEntry = entries.Entries[e]
			newEntry.odds = oddsLookup[entries.Entries[e].ProgramNumber]
			newEntry.result = resultsLookup[entries.Entries[e].ProgramNumber]
			customRaceObject.entries.push(newEntry)
		}

		customRaceObject.results = {
			WN : [],
			PL : [],
			SH : []
		}

		for (var rl=0; rl < resultsLookup.length; rl++) {
			var ptemp = resultsLookup[rl]
			if (ptemp != null) {

				if (ptemp.length==3) { 
					customRaceObject.results.WN.push(rl)
				} else if (ptemp.length==2) { 
					customRaceObject.results.PL.push(rl)
				} else if (ptemp.PoolType=="SH") { 
					customRaceObject.results.SH.push(rl)
				}
			}
		}

		if (process.env.ENVIRONMENT=='prod') {
	  	myCache.cache.put(myCache.cacheKeys.CUSTOM + r, customRaceObject, duration, function (key, value) {
	  		console.log(key + ' removed.')
	  		fetchAllData()
			}) 
		} else {
			myCache.cache.put(myCache.cacheKeys.CUSTOM + r, customRaceObject)
		}

		return customRaceObject

	}
	callback(null, customRaceObject)
}

exports.buildCustomRaceObject = buildCustomRaceObject
